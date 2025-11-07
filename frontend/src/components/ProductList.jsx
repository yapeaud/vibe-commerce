import React from 'react'

const ProductList = ({ products, onAddToCart }) => {
    return (
        <main>
            <h2 className="text-2xl font-bold mb-6">Nos Produits</h2>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <article key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200 flex items-center justify-center">
                            {product.image ? (
                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                            ) : (
                                <span className="text-gray-400">Image non disponible</span>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-blue-600">
                                    {product.price.toFixed(2)} €
                                </span>
                                <button
                                    onClick={() => onAddToCart(product._id)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
                                >
                                    Ajouter au panier
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default ProductList;