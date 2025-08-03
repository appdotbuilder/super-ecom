<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        $price = fake()->numberBetween(10000, 1000000);
        $hasSalePrice = fake()->boolean(30);

        return [
            'seller_id' => User::where('role', 'seller')->inRandomOrder()->first()->id ?? User::factory()->seller(),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
            'name' => ucwords($name),
            'slug' => Str::slug($name) . '-' . uniqid(),
            'description' => fake()->paragraphs(3, true),
            'short_description' => fake()->sentence(15),
            'price' => $price,
            'sale_price' => $hasSalePrice ? $price * 0.8 : null,
            'sku' => strtoupper(fake()->bothify('??##??##')),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'manage_stock' => fake()->boolean(80),
            'weight' => fake()->numberBetween(100, 2000), // in grams
            'images' => fake()->randomElements([
                fake()->imageUrl(600, 600, 'products'),
                fake()->imageUrl(600, 600, 'products'),
                fake()->imageUrl(600, 600, 'products'),
            ], fake()->numberBetween(1, 3)),
            'status' => fake()->randomElement(['draft', 'published', 'archived']),
            'featured' => fake()->boolean(20),
        ];
    }
}