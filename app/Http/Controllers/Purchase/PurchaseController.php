<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
use App\Models\Catalog\Product;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Session;
use App\Models\Purchase\PurchaseMst;
use App\Models\Purchase\PurchaseChd;
use App\Models\Purchase\StockMst;
use App\Models\Purchase\StockChd;
use App\Models\Purchase\PurPayDetail;
use App\Models\Supplier\Supplier;
use Carbon\Carbon;

class PurchaseController extends Controller
{
    public function index()
    {
        $data['products'] = Product::with('variantPrices')->get();
        // return $data['products'];
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Purchase/Index', $data);
    }

    public function store(Request $request)
    {
        // request data from server
        $data = $request->all()[0];
        // dd($data);
        // db transaction
        try {
            // Start transaction
            DB::beginTransaction();
            // insert purchase_msts table
            $purchaseMst = $this->save_purchase_msts($data);
            // insert purchase_chds table
            $this->save_purchase_chds($data, $purchaseMst->id);
            // insert stock_msts table
            $this->save_stock_msts($data);
            // insert stock_chds table
            // $this->save_stock_chds($data, $purchaseMst->id);
            // insert payment_msts table
            // $this->save_payment_msts($data, $purchaseMst->id);

            // Commit transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    public function save_purchase_msts($data)
    {
        // Call the stored procedure to generate a unique UID
        // $unique_uid = $this->generateUniqueUID('PURA', 'purchase_msts', 'purchase_uid');
        $prefix = 'PUR';
        $tableName = 'purchase_msts';
        $uidColumn = 'purchase_uid';

        $uniqueUid = $this->generateUniqueId($prefix, $tableName, $uidColumn);

        // Now you can use $uniqueUid as needed
        return PurchaseMst::create([
            'purchase_uid' => $uniqueUid,
            'supplier_id' => $data['supplier_id'],
            'purchase_date' => Carbon::now(),
            'sub_total' => $data['sub_total'],
            'discount_type' => $data['discount_type'],
            'discount_amt' => $data['discount'],
            'VAT_type' => $data['vat_type'],
            'VAT_amt' => $data['vat'],
            'grand_total' => $data['grand_total'],
            'status' => 'ordered',
            'created_by' => auth()->id(), // or some other valid user ID
            'updated_by' => $chd['updated_by'] ?? auth()->id(), // or some other valid user ID
        ]);
    }

    private function save_purchase_chds($data, $purchaseMstId)
    {
        foreach ($data['items'] as $chd) {
            PurchaseChd::create([
                'purchase_mst_id' => $purchaseMstId,
                'product_v_id' => $chd['variant_id'], // corrected the key
                'price' => $chd['variant_price'], // corrected the key
                'quantity' => $chd['quantity'],
                'purchase_date' => Carbon::now(),
                'status' => 1,
                'created_by' => auth()->id(), // or some other valid user ID
                'updated_by' => $chd['updated_by'] ?? auth()->id(), // or some other valid user ID
            ]);
        }
    }

    private function save_stock_msts($data)
    {
        foreach ($data['items'] as $stock) {
            dd($stock);
            $productId = $stock['product_v_id'];
            $quantityToAdd = $stock['quantity'];
            $currentTimestamp = Carbon::now();

            StockMst::updateOrInsert(
                ['product_v_id' => $productId],
                [
                    'quantity' => \DB::raw("quantity + $quantityToAdd"),
                    'last_updated' => $currentTimestamp,
                    'created_by' => $stock['created_by'],
                    'updated_by' => $stock['updated_by'],
                    'created_at' => $currentTimestamp,  // Only set when inserting a new record
                    'updated_at' => $currentTimestamp
                ]
            );
        }
    }

    private function save_stock_chds($data, $purchaseMstId = null, $salesMstId = null)
    {
        foreach ($data['items'] as $chd) {
            StockChd::create([
                'product_v_id' => $chd['product_v_id'],
                'quantity' => $chd['quantity'],
                'movement_type' => $chd['movement_type'],
                'movement_add_id' => $purchaseMstId,
                'movement_remove_id' => $salesMstId,
                'created_by' => $chd['created_by'],
                'updated_by' => $chd['updated_by'],
            ]);
        }
    }

    private function save_payment_msts($data, $purchaseMstId)
    {
        PurPayDetail::create([
            'pay_trans_no'    => $data->pay_trans_no,
            'purchase_mst_id' => $purchaseMstId,
            'pay_total'       => $data->pay_total,
            'pay_date'        => $data->pay_date,
            'pay_by'          => $data->pay_by,
            'trxID'           => $data->trxID,
            'status'          => $data->status,
            'created_by'      => $data->created_by,
            'updated_by'      => $data->updated_by,
        ]);
    }
    private function generateUniqueUID($prefix, $tableName, $uidColumn)
    {
        $result = \DB::select("CALL SP_GENERATE_UNIQUE_UID('$prefix', '$tableName', '$uidColumn')");
        // Extract the generated unique UID from the result (assuming it's a single row result)
        if (!empty($result) && isset($result[0]->generated_uid)) {
            return $result[0]->generated_uid;
        }

        // Handle error or fallback if needed
        return null;
    }
    public function generateUniqueId($prefix, $tableName, $uidColumn)
    {
        // Prepare the output parameter
        $output = DB::statement('SET @unique_uid = ""');

        // Call the stored procedure
        $result = DB::select('CALL SP_GENERATE_UNIQUE_UID(?, ?, ?, @unique_uid)', [
            $prefix,
            $tableName,
            $uidColumn
        ]);

        // Retrieve the output parameter
        $uniqueUid = DB::select('SELECT @unique_uid AS unique_uid');

        return $uniqueUid[0]->unique_uid;
    }
}
