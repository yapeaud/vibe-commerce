import React, { useState } from 'react';
import { checkout } from '../services/api';

const CheckoutForm = ({ onClose, onCheckout, cartTotal }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const receipt = await checkout(formData);
            onCheckout(receipt);
        } catch (error) {
            console.error('Erreur lors du checkout:', error);
            alert('Une erreur est survenue lors de la commande');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Selection className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Finaliser la commande</h2>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold">Total à payer: {cartTotal.toFixed(2)} €</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <article className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="customerName">
                                Nom complet
                            </label>
                            <input
                                type="text"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </article>

                        <article className="mb-6">
                            <label className="block text-gray-700 mb-2" htmlFor="customerEmail">
                                Email
                            </label>
                            <input
                                type="email"
                                id="customerEmail"
                                name="customerEmail"
                                value={formData.customerEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </article>

                        <article className="flex space-x-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                            >
                                {isLoading ? 'Traitement...' : 'Confirmer la commande'}
                            </button>
                        </article>
                    </form>
                </div>
            </Selection>
        </main>
    );
};

export default CheckoutForm;