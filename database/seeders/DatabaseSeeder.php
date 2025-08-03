<?php

namespace Database\Seeders;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@shophub.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+62812345678',
            'address' => 'Jakarta, Indonesia',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create sample seller users
        $sellers = User::factory()->count(5)->seller()->create();

        // Create sample buyer users
        $buyers = User::factory()->count(10)->buyer()->create();

        // Create categories
        $categories = Category::factory()->count(8)->create();

        // Create products for each seller
        foreach ($sellers as $seller) {
            Product::factory()->count(random_int(5, 15))->create([
                'seller_id' => $seller->id,
                'category_id' => $categories->random()->id,
            ]);
        }

        // Create some cart items for buyers
        foreach ($buyers->take(5) as $buyer) {
            $products = Product::where('status', 'published')->inRandomOrder()->take(random_int(1, 4))->get();
            
            foreach ($products as $product) {
                Cart::factory()->create([
                    'user_id' => $buyer->id,
                    'product_id' => $product->id,
                ]);
            }
        }

        // Create some orders
        $orders = Order::factory()->count(20)->create();

        // Create order items for each order
        foreach ($orders as $order) {
            $products = Product::where('status', 'published')->inRandomOrder()->take(random_int(1, 3))->get();
            
            foreach ($products as $product) {
                OrderItem::factory()->create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                ]);
            }
        }

        $this->command->info('Database seeded successfully!');
        $this->command->line('');
        $this->command->info('Login credentials:');
        $this->command->line('Admin: admin@shophub.com / password');
        $this->command->line('Test users created with role-based access');
    }
}