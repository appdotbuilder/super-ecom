<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with featured products
     */
    public function index()
    {
        $featuredProducts = Product::with(['category', 'seller'])
            ->published()
            ->featured()
            ->take(8)
            ->get();

        $categories = Category::active()
            ->withCount(['products' => function ($query) {
                $query->published();
            }])
            ->take(6)
            ->get();

        $latestProducts = Product::with(['category', 'seller'])
            ->published()
            ->latest()
            ->take(12)
            ->get();

        return Inertia::render('home', [
            'featuredProducts' => $featuredProducts,
            'categories' => $categories,
            'latestProducts' => $latestProducts,
        ]);
    }
}