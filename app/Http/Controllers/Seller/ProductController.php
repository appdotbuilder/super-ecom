<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of seller's products
     */
    public function index(Request $request)
    {
        $query = Product::where('seller_id', auth()->id())
            ->with('category');

        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->category) {
            $query->where('category_id', $request->category);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::active()->get();

        return Inertia::render('seller/products/index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'status', 'category']),
        ]);
    }

    /**
     * Show the form for creating a new product
     */
    public function create()
    {
        $categories = Category::active()->get();

        return Inertia::render('seller/products/create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created product
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
        $data['seller_id'] = auth()->id();
        $data['slug'] = Str::slug($data['name']) . '-' . uniqid();
        $data['sku'] = strtoupper(Str::random(8));

        $product = Product::create($data);

        return redirect()->route('seller.products.show', $product)
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified product
     */
    public function show(Product $product)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canViewProduct(auth()->user(), $product)) {
            abort(403, 'Access denied.');
        }
        
        $product->load('category');

        return Inertia::render('seller/products/show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified product
     */
    public function edit(Product $product)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canUpdateProduct(auth()->user(), $product)) {
            abort(403, 'Access denied.');
        }
        
        $product->load('category');
        $categories = Category::active()->get();

        return Inertia::render('seller/products/edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified product
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canUpdateProduct(auth()->user(), $product)) {
            abort(403, 'Access denied.');
        }

        $data = $request->validated();
        
        if ($data['name'] !== $product->name) {
            $data['slug'] = Str::slug($data['name']) . '-' . uniqid();
        }

        $product->update($data);

        return redirect()->route('seller.products.show', $product)
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified product
     */
    public function destroy(Product $product)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canDeleteProduct(auth()->user(), $product)) {
            abort(403, 'Access denied.');
        }
        
        $product->delete();

        return redirect()->route('seller.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}