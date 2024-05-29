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
        $data['product'] = Product::where('url_key', $slug)->first();
        return Inertia::render('Catalog/Product/Edit', $data);
    }

    function updated(Request $request, $slug)
    {
        return Inertia::render('Catalog/Product/Edit');
    }
}
