<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
class CartFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::where('role', 'buyer')->inRandomOrder()->first()->id ?? User::factory()->buyer(),
            'product_id' => Product::where('status', 'published')->inRandomOrder()->first()->id ?? Product::factory(),
            'quantity' => fake()->numberBetween(1, 5),
        ];
    }
}