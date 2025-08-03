<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard
     */
    public function index()
    {
        // User statistics
        $totalUsers = User::count();
        $totalBuyers = User::where('role', 'buyer')->count();
        $totalSellers = User::where('role', 'seller')->count();
        $totalAdmins = User::where('role', 'admin')->count();

        // Product statistics
        $totalProducts = Product::count();
        $publishedProducts = Product::where('status', 'published')->count();
        $draftProducts = Product::where('status', 'draft')->count();

        // Order statistics
        $totalOrders = Order::count();
        $pendingOrders = Order::where('status', 'pending')->count();
        $processingOrders = Order::where('status', 'processing')->count();
        $totalRevenue = Order::where('payment_status', 'paid')->sum('total');

        // Category statistics
        $totalCategories = Category::count();
        $activeCategories = Category::where('is_active', true)->count();

        // Recent orders
        $recentOrders = Order::with('user')
            ->latest()
            ->take(5)
            ->get();

        // Recent users
        $recentUsers = User::latest()
            ->take(5)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'users' => [
                    'total' => $totalUsers,
                    'buyers' => $totalBuyers,
                    'sellers' => $totalSellers,
                    'admins' => $totalAdmins,
                ],
                'products' => [
                    'total' => $totalProducts,
                    'published' => $publishedProducts,
                    'draft' => $draftProducts,
                ],
                'orders' => [
                    'total' => $totalOrders,
                    'pending' => $pendingOrders,
                    'processing' => $processingOrders,
                    'revenue' => $totalRevenue,
                ],
                'categories' => [
                    'total' => $totalCategories,
                    'active' => $activeCategories,
                ],
            ],
            'recentOrders' => $recentOrders,
            'recentUsers' => $recentUsers,
        ]);
    }
}