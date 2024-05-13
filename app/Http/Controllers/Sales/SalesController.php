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

class SalesController extends Controller
{
    function index()
    {
        return Inertia::render('Product/Index');
    }
    function store() {
        
    }
}
