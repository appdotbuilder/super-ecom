<?php

namespace App\Services;

use App\Models\Product;
use App\Models\User;
use App\Models\Cart;

class AuthorizationService
{
    /**
     * Check if user can view product
     */
    public function canViewProduct(User $user, Product $product): bool
    {
        return $user->isAdmin() || $product->seller_id === $user->id;
    }

    /**
     * Check if user can update product
     */
    public function canUpdateProduct(User $user, Product $product): bool
    {
        return $user->isAdmin() || $product->seller_id === $user->id;
    }

    /**
     * Check if user can delete product
     */
    public function canDeleteProduct(User $user, Product $product): bool
    {
        return $user->isAdmin() || $product->seller_id === $user->id;
    }

    /**
     * Check if user can update cart item
     */
    public function canUpdateCart(User $user, Cart $cart): bool
    {
        return $cart->user_id === $user->id;
    }

    /**
     * Check if user can delete cart item
     */
    public function canDeleteCart(User $user, Cart $cart): bool
    {
        return $cart->user_id === $user->id;
    }

    /**
     * Check if user can access seller features
     */
    public function canAccessSeller(User $user): bool
    {
        return $user->isSeller() || $user->isAdmin();
    }

    /**
     * Check if user can access admin features
     */
    public function canAccessAdmin(User $user): bool
    {
        return $user->isAdmin();
    }
}