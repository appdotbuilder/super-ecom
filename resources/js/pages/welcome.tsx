import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to ShopHub - Your Modern E-Commerce Platform">
                <meta name="description" content="ShopHub - Modern e-commerce platform connecting buyers and sellers with secure payments, shipping integration, and intuitive dashboards." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Header */}
                <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                    <span className="text-sm font-bold text-white">🛍️</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">ShopHub</h1>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                            Welcome, {auth.user.name}!
                                        </span>
                                        <Link
                                            href={route('dashboard')}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative overflow-hidden py-20 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                                🚀 Modern E-Commerce
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Platform</span>
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Connect buyers and sellers in a secure, feature-rich marketplace with integrated payments, 
                                shipping calculations, and powerful management dashboards.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {!auth.user && (
                                    <>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                                        >
                                            Start Selling Today
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            className="text-base font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            Browse Products <span aria-hidden="true">→</span>
                                        </Link>
                                    </>
                                )}
                                {auth.user && (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
                                    >
                                        Go to Dashboard
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="bg-white py-24 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                ✨ Everything You Need
                            </h2>
                            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                                Built for modern e-commerce with all the features you expect
                            </p>
                        </div>

                        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {/* Buyer Features */}
                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600">
                                    <span className="text-2xl">🛒</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Buyers</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Modern shopping experience with cart management, secure checkout, and order tracking.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>• Product catalog with search & filters</li>
                                    <li>• Shopping cart & wishlist</li>
                                    <li>• Secure payment with Midtrans</li>
                                    <li>• Real-time shipping costs</li>
                                    <li>• Order history & tracking</li>
                                </ul>
                            </div>

                            {/* Seller Features */}
                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-600">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Sellers</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Powerful dashboard to manage your products, orders, and grow your business.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>• Product management system</li>
                                    <li>• Order processing & fulfillment</li>
                                    <li>• Inventory tracking</li>
                                    <li>• Sales analytics & reports</li>
                                    <li>• Customer management</li>
                                </ul>
                            </div>

                            {/* Admin Features */}
                            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-gray-700 dark:bg-gray-800">
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600">
                                    <span className="text-2xl">⚙️</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">For Admins</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Complete platform management with user control and system oversight.
                                </p>
                                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li>• User & role management</li>
                                    <li>• Platform-wide analytics</li>
                                    <li>• Category management</li>
                                    <li>• Order monitoring</li>
                                    <li>• System configuration</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="bg-gray-50 py-16 dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                🔧 Built with Modern Technology
                            </h2>
                            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
                                    <div className="text-2xl">⚡</div>
                                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Laravel</div>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
                                    <div className="text-2xl">⚛️</div>
                                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">React</div>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
                                    <div className="text-2xl">💳</div>
                                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Midtrans</div>
                                </div>
                                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
                                    <div className="text-2xl">🚚</div>
                                    <div className="mt-2 text-sm font-medium text-gray-900 dark:text-white">RajaOngkir</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-blue-600 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white">
                                Ready to Start Your E-Commerce Journey?
                            </h2>
                            <p className="mt-4 text-lg text-blue-100">
                                Join thousands of buyers and sellers already using our platform
                            </p>
                            {!auth.user && (
                                <div className="mt-8 flex justify-center gap-4">
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors"
                                    >
                                        Create Account
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-white px-6 py-3 text-base font-semibold text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-white py-12 dark:bg-gray-900">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-r from-blue-600 to-purple-600">
                                    <span className="text-xs font-bold text-white">🛍️</span>
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-white">ShopHub</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                Built with ❤️ using{' '}
                                <a 
                                    href="https://laravel.com" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    Laravel
                                </a>
                                {' & '}
                                <a 
                                    href="https://react.dev" 
                                    target="_blank" 
                                    className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                                >
                                    React
                                </a>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}