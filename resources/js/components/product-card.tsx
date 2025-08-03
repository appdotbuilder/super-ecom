import { Link } from '@inertiajs/react';

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
}

interface ProductCardProps {
    product: Product;
    showAddToCart?: boolean;
}

export function ProductCard({ product, showAddToCart = false }: ProductCardProps) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const getEffectivePrice = () => {
        return product.sale_price ?? product.price;
    };

    return (
        <div className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow dark:border-gray-700 dark:bg-gray-800">
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
            
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                    {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    by {product.seller.name}
                </p>

                {product.short_description && (
                    <p className="text-sm text-gray-500 line-clamp-2 dark:text-gray-400">
                        {product.short_description}
                    </p>
                )}

                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {product.sale_price && (
                            <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                {formatPrice(product.price)}
                            </span>
                        )}
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(getEffectivePrice())}
                        </span>
                    </div>
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {product.category.name}
                    </span>
                </div>

                <div className="flex space-x-2">
                    <Link
                        href={route('products.show', product.slug)}
                        className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                    >
                        View Details
                    </Link>
                    
                    {showAddToCart && (
                        <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors">
                            🛒
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}