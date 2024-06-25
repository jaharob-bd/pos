<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurPayDetail extends Model
{
    use HasFactory;

    protected $table = 'pur_pay_details';
    protected $fillable = [
        'pay_trans_no', 'purchase_mst_id', 'pay_total', 'pay_date', 'pay_by', 'trxID', 'status', 'created_by', 'updated_by'
    ];

    public function purchaseMst()
    {
        return $this->belongsTo(PurchaseMst::class, 'purchase_mst_id');
    }
}
