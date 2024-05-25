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
        return Inertia::render('Catalog/Product/Index');
    }

    function store_old(Request $request)
    {
        // Define validation rules with additional criteria
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:255',
            'url_key' => 'required|string|min:3|max:100|regex:/^[a-z0-9-]+$/|unique:products,url_key',
            'sku' => 'required|string|min:3|max:50|unique:products,sku',
            'product_code' => 'required|string',
        ], [
            // Custom error messages
            'name.required' => 'The product name is required.',
            'name.min' => 'The product name must be at least 3 characters.',
            'name.max' => 'The product name may not be greater than 255 characters.',
            'url_key.required' => 'The URL key is required.',
            'url_key.min' => 'The URL key must be at least 3 characters.',
            'url_key.max' => 'The URL key may not be greater than 255 characters.',
            'url_key.regex' => 'The URL key may only contain letters, numbers, and hyphens.',
            'url_key.unique' => 'The URL key has already been taken.',
            'sku.required' => 'The SKU is required.',
            'sku.min' => 'The SKU must be at least 3 characters.',
            'sku.max' => 'The SKU may not be greater than 50 characters.',
            'sku.unique' => 'The SKU has already been taken.',
            'product_code.required' => 'The product code is required.'
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            Session::flash('error', $errors);
            return redirect()->route('products');
        }
        // Example: Create a new product in the database
        Product::create($request->all());
        Session::flash('success', 'Product add successfully!!');
        return redirect()->route('products');
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
        $data['product'] = Product::where('url_key', $slug)->first();
        return Inertia::render('Catalog/Product/Edit', $data);
    }

    function updated(Request $request, $slug)
    {
        return Inertia::render('Catalog/Product/Edit');
    }
}
