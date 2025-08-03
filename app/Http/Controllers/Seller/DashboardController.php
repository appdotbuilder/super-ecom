<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the seller dashboard
     */
    public function index()
    {
        $sellerId = auth()->id();

        // Get seller's products count
        $totalProducts = Product::where('seller_id', $sellerId)->count();
        $publishedProducts = Product::where('seller_id', $sellerId)->where('status', 'published')->count();
        $draftProducts = Product::where('seller_id', $sellerId)->where('status', 'draft')->count();

        // Get orders for seller's products
        $orderItems = OrderItem::whereHas('product', function ($query) use ($sellerId) {
            $query->where('seller_id', $sellerId);
        })->with(['order', 'product']);

        $totalOrders = $orderItems->count();
        $totalRevenue = $orderItems->sum('total');

        // Recent orders
        $recentOrders = $orderItems->with(['order.user', 'product'])
            ->latest()
            ->take(5)
            ->get();

        // Low stock products
        $lowStockProducts = Product::where('seller_id', $sellerId)
            ->where('manage_stock', true)
            ->where('stock_quantity', '<=', 5)
            ->take(5)
            ->get();

        return Inertia::render('seller/dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'publishedProducts' => $publishedProducts,
                'draftProducts' => $draftProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
            ],
            'recentOrders' => $recentOrders,
            'lowStockProducts' => $lowStockProducts,
        ]);
    }
}