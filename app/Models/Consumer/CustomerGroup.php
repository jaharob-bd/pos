<?php

namespace App\Models\Consumer;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerGroup extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'code', 'notes', 'status'];

    // public function product()
    // {
    //     return $this->belongsTo(Product::class);
    // }
}
