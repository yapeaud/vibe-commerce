import React from 'react'

const Cart = ({ cart, onRemoveFromCart, onCheckout }) => {
    if (cart.items.length === 0) {
        return (
            <article className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-4">Votre Panier</h2>
                <p className="text-gray-600">Votre panier est vide</p>
            </article>
        )
    }
    return (
        <main className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Votre Panier</h2>

            <section className="space-y-4">
                {cart.items.map((item) => (
                    <article key={item.productId._id} className="flex justify-between items-center border-b pb-4">
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.productId.name}</h3>
                            <p className="text-gray-600">{item.productId.price.toFixed(2)} € × {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="font-bold">
                                {(item.productId.price * item.quantity).toFixed(2)} €
                            </span>
                            <button
                                onClick={() => onRemoveFromCart(item.productId._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
                            >
                                Supprimer
                            </button>
                        </div>
                    </article>
                ))}
            </section>

            <section className="mt-6 pt-4 border-t">
                <article className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-2xl font-bold text-blue-600">{cart.total.toFixed(2)} €</span>
                </article>

                <button
                    onClick={onCheckout}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200"
                >
                    Procéder au paiement
                </button>
            </section>
        </main>
    );
};

export default Cart;