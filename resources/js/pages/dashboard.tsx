import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';



export default function Dashboard() {
    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🛍️</div>
                                <h1 className="text-3xl font-bold mb-4">Welcome to ShopHub!</h1>
                                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                                    Discover amazing products, manage your orders, and enjoy a seamless shopping experience.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                                    <div className="text-center p-6 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                        <div className="text-3xl mb-3">🛒</div>
                                        <h3 className="text-lg font-semibold mb-2">Shop Products</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Browse our extensive catalog of products from trusted sellers
                                        </p>
                                        <Link
                                            href="/products"
                                            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Browse Products
                                        </Link>
                                    </div>
                                    
                                    <div className="text-center p-6 bg-green-50 rounded-lg dark:bg-green-900/20">
                                        <div className="text-3xl mb-3">🛍️</div>
                                        <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            View and manage items in your shopping cart
                                        </p>
                                        <Link
                                            href="/cart"
                                            className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                                        >
                                            View Cart
                                        </Link>
                                    </div>
                                    
                                    <div className="text-center p-6 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                                        <div className="text-3xl mb-3">📦</div>
                                        <h3 className="text-lg font-semibold mb-2">Order History</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            Track your orders and view purchase history
                                        </p>
                                        <Link
                                            href="/orders"
                                            className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                                        >
                                            View Orders
                                        </Link>
                                    </div>
                                </div>

                                <div className="mt-12 text-center">
                                    <h3 className="text-xl font-semibold mb-4">Want to sell on ShopHub?</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Join thousands of sellers and start your e-commerce journey today!
                                    </p>
                                    <Link
                                        href="/register"
                                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
                                    >
                                        Become a Seller
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}