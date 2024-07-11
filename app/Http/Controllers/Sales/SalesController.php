<?php

namespace App\Http\Controllers\Sales;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Catalog\Product;
use App\Models\Supplier\Supplier;
use App\Models\Purchase\PurchaseMst;
use Carbon\Carbon;

class SalesController extends Controller
{
    function index()
    {
        $data['purchases'] = PurchaseMst::all();
        return Inertia::render('Sales/OrderLists', $data);
        // $data['products'] = Product::with('variantPrices')->get();
        // // return $data['products'];
        // $data['suppliers'] = Supplier::all();
        // return Inertia::render('Sales/Index');
    }
    function create()
    {
        $data['products'] = Product::with('variantPrices')->get();
        // return $data['products'];
        $data['suppliers'] = Supplier::all();
        return Inertia::render('Sales/OrderCreate', $data);
    }
    function store() {
        
    }
}
