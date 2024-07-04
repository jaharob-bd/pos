<?php

namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseChd extends Model
{
    use HasFactory;

    protected $table = 'purchase_chds';
    protected $fillable = [
        'purchase_mst_id', 'product_v_id', 'quantity', 'price', 'purchase_date', 'status', 'created_by', 'updated_by'
    ];

    public function purchaseMst()
    {
        return $this->belongsTo(PurchaseMst::class, 'purchase_mst_id');
    }
}
