<?php

namespace App\Models\Consumer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email', 'phone', 'gender', 'dob', 'customer_group_id', 'status'];

    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }
}
