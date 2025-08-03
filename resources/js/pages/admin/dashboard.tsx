import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface UserStats {
    total: number;
    buyers: number;
    sellers: number;
    admins: number;
}

interface ProductStats {
    total: number;
    published: number;
    draft: number;
}

interface OrderStats {
    total: number;
    pending: number;
    processing: number;
    revenue: number;
}

interface CategoryStats {
    total: number;
    active: number;
}

interface Stats {
    users: UserStats;
    products: ProductStats;
    orders: OrderStats;
    categories: CategoryStats;
}

interface Order {
    id: number;
    order_number: string;
    total: number;
    status: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recentOrders: Order[];
    recentUsers: User[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentOrders, recentUsers }: Props) {
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

    const getRoleColor = (role: string) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'seller':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'buyer':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ⚙️ Admin Dashboard
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            Manage your entire e-commerce platform from here.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Users Stats */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Users
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.users.total}
                                    </p>
                                </div>
                                <div className="text-3xl">👥</div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-blue-600">{stats.users.buyers} Buyers</span> • 
                                <span className="text-green-600"> {stats.users.sellers} Sellers</span> • 
                                <span className="text-red-600"> {stats.users.admins} Admins</span>
                            </div>
                        </div>

                        {/* Products Stats */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Products
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.products.total}
                                    </p>
                                </div>
                                <div className="text-3xl">📦</div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-green-600">{stats.products.published} Published</span> • 
                                <span className="text-yellow-600"> {stats.products.draft} Draft</span>
                            </div>
                        </div>

                        {/* Orders Stats */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Orders
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {stats.orders.total}
                                    </p>
                                </div>
                                <div className="text-3xl">🛒</div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-yellow-600">{stats.orders.pending} Pending</span> • 
                                <span className="text-blue-600"> {stats.orders.processing} Processing</span>
                            </div>
                        </div>

                        {/* Revenue Stats */}
                        <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Total Revenue
                                    </p>
                                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {formatPrice(stats.orders.revenue)}
                                    </p>
                                </div>
                                <div className="text-3xl">💰</div>
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                <span className="text-green-600">{stats.categories.active} Active Categories</span>
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
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        Order #{order.order_number}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {order.user.name} • {formatDate(order.created_at)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {formatPrice(order.total)}
                                                    </p>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                                                    >
                                                        {order.status}
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

                        {/* Recent Users */}
                        <div className="rounded-lg bg-white shadow dark:bg-gray-800">
                            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    👥 Recent Users
                                </h3>
                            </div>
                            <div className="p-6">
                                {recentUsers.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                                            >
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {user.email}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Joined {formatDate(user.created_at)}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleColor(user.role)}`}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600 dark:text-gray-400">No recent users</p>
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
                                href={route('admin.users.index')}
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">👥</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Manage Users</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View all users</p>
                                </div>
                            </Link>

                            <Link
                                href="/admin/products"
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">📦</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Manage Products</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">View all products</p>
                                </div>
                            </Link>

                            <Link
                                href="/admin/categories"
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">🏷️</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">Manage Categories</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Edit categories</p>
                                </div>
                            </Link>

                            <Link
                                href="/admin/orders"
                                className="flex items-center rounded-lg border border-gray-200 p-4 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                            >
                                <div className="text-2xl">📋</div>
                                <div className="ml-3">
                                    <p className="font-medium text-gray-900 dark:text-white">View Orders</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitor orders</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}