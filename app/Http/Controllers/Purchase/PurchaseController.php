<?php

namespace App\Http\Controllers\Purchase;

use App\Http\Controllers\Controller;
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
use Carbon\Carbon;

class PurchaseController extends Controller
{
    public function index()
    {
        return Inertia::render('Purchase/Index');
    }

    public function store(Request $request)
    {
        // db transaction
        try {
            // Start transaction
            DB::beginTransaction();

            // insert purchase_msts table
            $purchaseMst = $this->save_purchase_msts($request);

            // insert purchase_chds table
            $this->save_purchase_chds($request, $purchaseMst->id);

            // insert stock_msts table
            $this->save_stock_msts($request);

            // insert stock_chds table
            $this->save_stock_chds($request);

            // insert payment_msts table
            $this->save_payment_msts($request, $purchaseMst->id);

            // Commit transaction
            DB::commit();
        } catch (\Exception $e) {
            // Rollback transaction in case of error
            DB::rollBack();
            Session::flash('failed', $e->getMessage());
        }
    }

    private function save_purchase_msts(Request $request)
    {
        return PurchaseMst::create([
            'purchase_uid' => $request->purchase_uid,
            'supplier_id' => $request->supplier_id,
            'purchase_date' => $request->purchase_date,
            'total_cost' => $request->total_cost,
            'status' => $request->status,
            'created_by' => $request->created_by,
            'updated_by' => $request->updated_by,
        ]);
    }

    private function save_purchase_chds(Request $request, $purchaseMstId)
    {
        foreach ($request->purchase_chds as $chd) {
            PurchaseChd::create([
                'purchase_mst_id' => $purchaseMstId,
                'product_v_id' => $chd['product_v_id'],
                'quantity' => $chd['quantity'],
                'price' => $chd['price'],
                'total_cost' => $chd['total_cost'],
                'purchase_date' => $request->purchase_date,
                'status' => $chd['status'],
                'created_by' => $chd['created_by'],
                'updated_by' => $chd['updated_by'],
            ]);
        }
    }

    private function save_stock_msts(Request $request)
    {
        foreach ($request->stock_msts as $stock) {
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

    public function updateStock(Request $request)
    {
        $productId = $request->input('product_v_id');
        $quantityToAdd = $request->input('quantity');

        $currentTimestamp = Carbon::now();

        StockMst::updateOrInsert(
            ['product_id' => $productId],
            [
                'quantity' => \DB::raw("quantity + $quantityToAdd"),
                'last_updated' => $currentTimestamp
            ]
        );

        return response()->json(['message' => 'Stock updated successfully']);
    }

    private function save_stock_chds(Request $request)
    {
        foreach ($request->stock_chds as $chd) {
            StockChd::create([
                'product_v_id' => $chd['product_v_id'],
                'quantity' => $chd['quantity'],
                'movement_type' => $chd['movement_type'],
                'movement_add_id' => $chd['movement_add_id'],
                'movement_remove_id' => $chd['movement_remove_id'],
                'created_by' => $chd['created_by'],
                'updated_by' => $chd['updated_by'],
            ]);
        }
    }

    private function save_payment_msts(Request $request, $purchaseMstId)
    {
        PurPayDetail::create([
            'pay_trans_no' => $request->pay_trans_no,
            'purchase_mst_id' => $purchaseMstId,
            'pay_total' => $request->pay_total,
            'pay_date' => $request->pay_date,
            'pay_by' => $request->pay_by,
            'trxID' => $request->trxID,
            'status' => $request->status,
            'created_by' => $request->created_by,
            'updated_by' => $request->updated_by,
        ]);
    }
}
