<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->numberBetween(50000, 500000);
        $shippingCost = fake()->numberBetween(10000, 50000);
        $total = $subtotal + $shippingCost;

        return [
            'order_number' => Order::generateOrderNumber(),
            'user_id' => User::where('role', 'buyer')->inRandomOrder()->first()->id ?? User::factory()->buyer(),
            'status' => fake()->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
            'total' => $total,
            'shipping_address' => [
                'name' => fake()->name(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'postal_code' => fake()->postcode(),
                'country' => 'Indonesia',
            ],
            'billing_address' => [
                'name' => fake()->name(),
                'phone' => fake()->phoneNumber(),
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'postal_code' => fake()->postcode(),
                'country' => 'Indonesia',
            ],
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'e_wallet']),
            'payment_status' => fake()->randomElement(['pending', 'paid', 'failed', 'refunded']),
            'midtrans_order_id' => fake()->uuid(),
            'shipping_courier' => fake()->randomElement(['JNE', 'TIKI', 'POS']),
            'shipping_service' => fake()->randomElement(['REG', 'YES', 'OKE']),
            'tracking_number' => fake()->optional()->numerify('############'),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}