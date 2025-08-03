import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Stats {
    totalProducts: number;
    publishedProducts: number;
    draftProducts: number;
    totalOrders: number;
    totalRevenue: number;
}

interface OrderItem {
    id: number;
    quantity: number;
    price: number;
    total: number;
    order: {
        id: number;
        order_number: string;
        status: string;
        created_at: string;
        user: {
            name: string;
            email: string;
        };
    };
    product: {
        name: string;
        slug: string;
    };
}

interface Product {
    id: number;
    name: string;
    stock_quantity: number;
    manage_stock: boolean;
}

interface Props {
    stats: Stats;
    recentOrders: OrderItem[];
    lowStockProducts: Product[];
    [key: string]: unknown;
}

export default function SellerDashboard({ stats, recentOrders, lowStockProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID');
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'processing':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'shipped':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppShell>
            <Head title="Seller Dashboard" />
            
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📊 Seller Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Manage your products, orders, and track your business performance.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-2xl">📦</div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Products
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.totalProducts}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-2xl">✅</div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Published
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.publishedProducts}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-2xl">📝</div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Drafts
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.draftProducts}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-2xl">🛒</div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Orders
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.totalOrders}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center">
                                <div className="text-2xl">💰</div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Revenue
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {formatPrice(stats.totalRevenue)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {/* Recent Orders */}
                        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    🛍️ Recent Orders
                                </h3>
                            </div>
                            <div className="p-6">
                                {recentOrders.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentOrders.map((orderItem) => (
                                            <div
                                                key={orderItem.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {orderItem.product.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Order #{orderItem.order.order_number}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {orderItem.order.user.name} • {formatDate(orderItem.order.created_at)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {formatPrice(orderItem.total)}
                                                    </p>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(orderItem.order.status)}`}
                                                    >
                                                        {orderItem.order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">No recent orders</p>
                                )}
                            </div>
                        </div>

                        {/* Low Stock Products */}
                        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    ⚠️ Low Stock Alert
                                </h3>
                            </div>
                            <div className="p-6">
                                {lowStockProducts.length > 0 ? (
                                    <div className="space-y-3">
                                        {lowStockProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20"
                                            >
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {product.name}
                                                    </p>
                                                    <p className="text-sm text-red-600 dark:text-red-400">
                                                        Only {product.stock_quantity} left in stock
                                                    </p>
                                                </div>
                                                <Link
                                                    href={route('seller.products.edit', product.id)}
                                                    className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                                >
                                                    Update Stock
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">All products are well stocked</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                            🚀 Quick Actions
                        </h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Link
                                href={route('seller.products.create')}
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">➕</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Add Product</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Create new product</p>
                                </div>
                            </Link>

                            <Link
                                href={route('seller.products.index')}
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">📦</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Manage Products</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Edit your products</p>
                                </div>
                            </Link>

                            <Link
                                href="/seller/orders"
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">📋</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">View Orders</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Process orders</p>
                                </div>
                            </Link>

                            <Link
                                href="/seller/analytics"
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">📊</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Analytics</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View reports</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}