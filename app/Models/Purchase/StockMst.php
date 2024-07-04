<?php

namespace App\Models\Purchase;

use App\Models\Catalog\ProductVariantPrice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StockMst extends Model
{
    use HasFactory;

    protected $table = 'stock_msts';
    protected $fillable = [
        'product_v_id', 'quantity', 'last_updated', 'created_by', 'updated_by'
    ];

    public function productVariantPrice()
    {
        return $this->belongsTo(ProductVariantPrice::class, 'product_v_id');
    }
}
