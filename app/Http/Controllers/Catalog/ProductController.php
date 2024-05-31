<?php

namespace App\Http\Controllers\Catalog;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Validator;
use App\Models\Catalog\Product;
use App\Http\Requests\Catalog\Product\StoreProductRequest;


class ProductController extends Controller
{
    function index()
    {
        $data['products'] = Product::all();
        return Inertia::render('Catalog/Product/Index', $data);
    }

    public function store(StoreProductRequest $request)
    {
        $data = $request->all();
        // If validation passes, proceed with creating the product
        $inserted = Product::create($request->validated());
        if ($inserted) {
            Session::flash('success', 'Product added successfully!');
            // Redirect to the desired page (e.g., product listing) with serialized data
            return redirect()->route('product-edit', ['slug' => $inserted->url_key]);
        }
    }

    function edit($slug)
    {
        $data['product'] = Product::with('productCategory')
            ->with('images')
            ->with('variantPrices')
            ->with('groupPrices')
            ->where('url_key', $slug)->first();
        // return $data['product']; exit;
        return Inertia::render('Catalog/Product/Edit', $data);
    }

    function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->name = $request->name;
        $product->url_key = $request->url_key;
        $product->sku = $request->sku;
        $product->product_code = $request->product_code;
        $product->short_description = $request->short_description;
        $product->description = $request->description;
        $product->save();
        Session::flash('success', 'Product updated successfully!');
        return redirect()->route('product-edit', ['slug' => $product->url_key]);
    }
}
