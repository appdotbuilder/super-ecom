<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $product = Product::where('status', 'published')->inRandomOrder()->first() ?? Product::factory()->create();
        $quantity = fake()->numberBetween(1, 3);
        $price = $product->effective_price;
        $total = $quantity * $price;

        return [
            'order_id' => Order::inRandomOrder()->first()->id ?? Order::factory(),
            'product_id' => $product->id,
            'quantity' => $quantity,
            'price' => $price,
            'total' => $total,
            'product_snapshot' => [
                'name' => $product->name,
                'description' => $product->description,
                'price' => $product->price,
                'sale_price' => $product->sale_price,
                'images' => $product->images,
                'sku' => $product->sku,
                'category_name' => $product->category->name ?? 'Unknown',
                'seller_name' => $product->seller->name ?? 'Unknown',
            ],
        ];
    }
}