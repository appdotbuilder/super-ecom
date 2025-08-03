import { AppShell } from '@/components/app-shell';
import { Head, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images?: string[];
    short_description?: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    seller: {
        id: number;
        name: string;
    };
    [key: string]: unknown;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products_count: number;
    [key: string]: unknown;
}

interface Props {
    featuredProducts: Product[];
    categories: Category[];
    latestProducts: Product[];
    [key: string]: unknown;
}

export default function Home({ featuredProducts, categories, latestProducts }: Props) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getEffectivePrice = (product: Product) => {
        return product.sale_price ?? product.price;
    };

    return (
        <AppShell>
            <Head title="ShopHub - Modern E-Commerce Platform" />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                            🛍️ Welcome to ShopHub
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
                            Discover amazing products from trusted sellers. Shop with confidence and enjoy secure payments with fast shipping.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/products"
                                className="rounded-lg bg-white px-6 py-3 text-base font-semibold text-blue-600 shadow-sm hover:bg-gray-50 transition-colors"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/categories"
                                className="text-base font-semibold leading-6 text-white hover:text-blue-100 transition-colors"
                            >
                                Browse Categories <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {/* Featured Products */}
                {featuredProducts.length > 0 && (
                    <section className="mb-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                ⭐ Featured Products
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Hand-picked products just for you
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
                                    <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-4xl">
                                                📦
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        by {product.seller.name}
                                    </p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {product.sale_price && (
                                                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {formatPrice(getEffectivePrice(product))}
                                            </span>
                                        </div>
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            {product.category.name}
                                        </span>
                                    </div>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="mt-4 block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Categories */}
                {categories.length > 0 && (
                    <section className="mb-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                🏷️ Shop by Categories
                            </h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-300">
                                Find exactly what you're looking for
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/products?category=${category.slug}`}
                                    className="group rounded-lg border border-gray-200 bg-white p-6 text-center hover:border-blue-300 hover:shadow-md transition-all dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
                                >
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl group-hover:bg-blue-200 transition-colors dark:bg-blue-900 dark:group-hover:bg-blue-800">
                                        📱
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                        {category.name}
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        {category.products_count} products
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Latest Products */}
                {latestProducts.length > 0 && (
                    <section>
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    🆕 Latest Products
                                </h2>
                                <p className="mt-2 text-gray-600 dark:text-gray-300">
                                    Fresh arrivals from our sellers
                                </p>
                            </div>
                            <Link
                                href="/products"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View all →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {latestProducts.map((product) => (
                                <div key={product.id} className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
                                    <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                                        {product.images && product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="flex h-full items-center justify-center text-4xl">
                                                📦
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                        {product.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                                        by {product.seller.name}
                                    </p>
                                    {product.short_description && (
                                        <p className="mt-2 text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                                            {product.short_description}
                                        </p>
                                    )}
                                    <div className="mt-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {product.sale_price && (
                                                <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                                    {formatPrice(product.price)}
                                                </span>
                                            )}
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {formatPrice(getEffectivePrice(product))}
                                            </span>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="mt-4 block w-full rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Empty State */}
                {featuredProducts.length === 0 && latestProducts.length === 0 && (
                    <div className="py-20 text-center">
                        <div className="text-6xl mb-4">🛍️</div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Products Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Be the first seller to add products to our marketplace!
                        </p>
                        <Link
                            href="/seller/products/create"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                            Add Your First Product
                        </Link>
                    </div>
                )}
            </div>
        </AppShell>
    );
}