<?php

use App\Http\Controllers\Invoice\InvoiceController;
use App\Http\Controllers\Catalog\ProductController;
use App\Http\Controllers\Purchase\PurchaseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    // catalog module
    Route::get('/products', [ProductController::class, 'index'])->name('products');
    Route::post('/product-store', [ProductController::class, 'store'])->name('product-store');
    Route::get('/product-edit/{slug}', [ProductController::class, 'edit'])->name('product-edit');
    Route::patch('/product-update/{id}', [ProductController::class, 'update'])->name('product-update');
    Route::post('/product-image-upload/{id}', [ProductController::class, 'imageUpload'])->name('product-image-upload');
    Route::patch('/product-variant-price/{id}', [ProductController::class, 'variantPrice'])->name('product-variant-price');
    
    // Purchase
    Route::get('/purchase', [PurchaseController::class, 'index'])->name('purchase');
    Route::post('/purchase-store', [PurchaseController::class, 'store'])->name('purchase-store');
    // Sales invoice
    Route::get('/invoice', [InvoiceController::class, 'index'])->name('invoice');
    Route::post('/invoice-store', [ProfileController::class, 'store'])->name('invoice-store');
});

require __DIR__.'/auth.php';
