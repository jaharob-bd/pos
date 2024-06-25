<?php
namespace App\Models\Purchase;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseMst extends Model
{
    use HasFactory;

    protected $table = 'purchase_msts';
    protected $fillable = [
        'purchase_uid', 'supplier_id', 'purchase_date', 'total_cost', 'status', 'created_by', 'updated_by'
    ];

    public function purchaseChds()
    {
        return $this->hasMany(PurchaseChd::class, 'purchase_mst_id');
    }

    public function purPayDetails()
    {
        return $this->hasMany(PurPayDetail::class, 'purchase_mst_id');
    }
}
