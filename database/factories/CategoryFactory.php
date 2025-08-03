<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = [
            'Electronics', 'Fashion', 'Home & Garden', 'Sports & Outdoor',
            'Books & Media', 'Health & Beauty', 'Automotive', 'Toys & Games',
            'Food & Beverages', 'Art & Crafts', 'Travel & Luggage', 'Pet Supplies'
        ];

        $name = fake()->unique()->randomElement($categories);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'description' => fake()->sentence(10),
            'image' => fake()->imageUrl(400, 300, 'categories'),
            'is_active' => fake()->boolean(90),
        ];
    }
}