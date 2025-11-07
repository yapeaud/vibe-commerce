import React from 'react';

const ProductList = ({ products, onAddToCart, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1M9 7h6" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Aucun produit disponible</h3>
                <p className="text-gray-500">Les produits seront bientôt disponibles.</p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900">Nos Produits</h2>
                <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {products.length} produit{products.length > 1 ? 's' : ''}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="h-48 bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-sm">Aucune image</span>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1 mr-2">
                                    {product.name}
                                </h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                                    {product.category || 'Général'}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {product.description || 'Aucune description disponible.'}
                            </p>

                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {typeof product.price === 'number' ? product.price.toFixed(2) : '0.00'} €
                                </span>
                                <button
                                    onClick={() => onAddToCart(product._id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    <span>Ajouter</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;