<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart
     */
    public function index()
    {
        $cartItems = Cart::with(['product.category', 'product.seller'])
            ->where('user_id', auth()->id())
            ->get();

        $subtotal = $cartItems->sum(function ($item) {
            return $item->quantity * $item->product->effective_price;
        });

        return Inertia::render('cart/index', [
            'cartItems' => $cartItems,
            'subtotal' => $subtotal,
        ]);
    }

    /**
     * Add product to cart
     */
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Check stock
        if ($product->manage_stock && $product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available');
        }

        $cartItem = Cart::where('user_id', auth()->id())
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $newQuantity = $cartItem->quantity + $request->quantity;
            
            // Check stock for updated quantity
            if ($product->manage_stock && $product->stock_quantity < $newQuantity) {
                return back()->with('error', 'Not enough stock available');
            }
            
            $cartItem->update(['quantity' => $newQuantity]);
        } else {
            Cart::create([
                'user_id' => auth()->id(),
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return back()->with('success', 'Product added to cart');
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request, Cart $cart)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canUpdateCart(auth()->user(), $cart)) {
            abort(403, 'Access denied.');
        }

        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        // Check stock
        if ($cart->product->manage_stock && $cart->product->stock_quantity < $request->quantity) {
            return back()->with('error', 'Not enough stock available');
        }

        $cart->update(['quantity' => $request->quantity]);

        return back()->with('success', 'Cart updated');
    }

    /**
     * Remove cart item
     */
    public function destroy(Cart $cart)
    {
        $authService = new \App\Services\AuthorizationService();
        
        if (!$authService->canDeleteCart(auth()->user(), $cart)) {
            abort(403, 'Access denied.');
        }
        
        $cart->delete();

        return back()->with('success', 'Item removed from cart');
    }
}