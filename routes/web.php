<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\Seller\DashboardController as SellerDashboardController;
use App\Http\Controllers\Seller\ProductController as SellerProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes - Welcome page for new visitors, Home page for the e-commerce experience
Route::get('/', function () {
    // Show welcome page for non-authenticated users, home page for authenticated users
    if (auth()->check()) {
        return app(\App\Http\Controllers\HomeController::class)->index();
    }
    return Inertia::render('welcome');
})->name('home');
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{product:slug}', [ProductController::class, 'show'])->name('products.show');

// Authenticated routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard - redirect based on role
    Route::get('/dashboard', function () {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        } elseif ($user->isSeller()) {
            return redirect()->route('seller.dashboard');
        } else {
            return Inertia::render('dashboard');
        }
    })->name('dashboard');

    // Cart routes (for buyers)
    Route::middleware(\App\Http\Middleware\RoleMiddleware::class . ':buyer')->group(function () {
        Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
        Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
        Route::put('/cart/{cart}', [CartController::class, 'update'])->name('cart.update');
        Route::delete('/cart/{cart}', [CartController::class, 'destroy'])->name('cart.destroy');
    });

    // Seller routes
    Route::prefix('seller')->name('seller.')->middleware(\App\Http\Middleware\RoleMiddleware::class . ':seller')->group(function () {
        Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('dashboard');
        Route::resource('products', SellerProductController::class);
    });

    // Admin routes
    Route::prefix('admin')->name('admin.')->middleware(\App\Http\Middleware\RoleMiddleware::class . ':admin')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', AdminUserController::class);
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';