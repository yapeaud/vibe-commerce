import React, { useState } from 'react';

const Cart = ({ cart, onRemoveFromCart, onCheckout, loading }) => {
    const [updatingItem, setUpdatingItem] = useState(null);

    const handleRemoveItem = async (productId) => {
        setUpdatingItem(productId);
        try {
            await onRemoveFromCart(productId);
        } finally {
            setUpdatingItem(null);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center border-b pb-4">
                                <div className="flex-1">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/6"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-1/12"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Votre panier est vide</h2>
                <p className="text-gray-500 mb-6">Ajoutez des produits pour commencer vos achats.</p>
                <button
                    onClick={() => window.location.reload()} // Ou une fonction de navigation si vous utilisez React Router
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
                >
                    Découvrir les produits
                </button>
            </div>
        );
    }

    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">Votre Panier</h2>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {totalItems} article{totalItems > 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            <div className="divide-y">
                {cart.items.map((item) => (
                    <div key={item.productId._id} className="p-6">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-start space-x-4">
                                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        {item.productId.image ? (
                                            <img
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                                className="w-12 h-12 object-cover"
                                            />
                                        ) : (
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                                            {item.productId.name}
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {typeof item.productId.price === 'number' ? item.productId.price.toFixed(2) : '0.00'} €
                                        </p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                Quantité: {item.quantity}
                                            </span>
                                            <span className="text-sm font-medium text-green-600">
                                                Sous-total: {(item.productId.price * item.quantity).toFixed(2)} €
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRemoveItem(item.productId._id)}
                                disabled={updatingItem === item.productId._id}
                                className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded-lg transition duration-200 ml-4 flex-shrink-0"
                                title="Supprimer du panier"
                            >
                                {updatingItem === item.productId._id ? (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-6 bg-gray-50 border-t">
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Sous-total:</span>
                        <span className="font-semibold">{cart.total?.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="text-gray-600">Frais de livraison:</span>
                        <span className="font-semibold text-green-600">Gratuit</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold pt-3 border-t">
                        <span>Total:</span>
                        <span className="text-blue-600">{cart.total?.toFixed(2)} €</span>
                    </div>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg transition duration-200 flex items-center justify-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Procéder au paiement</span>
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                    Paiement sécurisé - Aucun paiement réel ne sera effectué
                </p>
            </div>
        </div>
    );
};

export default Cart;