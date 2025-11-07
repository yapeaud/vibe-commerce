import React, { useState } from 'react';
import { checkout } from '../services/api';

const CheckoutForm = ({ onClose, onCheckout, cartTotal, cartItems }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerAddress: '',
        customerCity: '',
        customerZipCode: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.customerName.trim()) {
            newErrors.customerName = 'Le nom est requis';
        }

        if (!formData.customerEmail.trim()) {
            newErrors.customerEmail = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.customerEmail)) {
            newErrors.customerEmail = 'L\'email n\'est pas valide';
        }

        if (!formData.customerAddress.trim()) {
            newErrors.customerAddress = 'L\'adresse est requise';
        }

        if (!formData.customerCity.trim()) {
            newErrors.customerCity = 'La ville est requise';
        }

        if (!formData.customerZipCode.trim()) {
            newErrors.customerZipCode = 'Le code postal est requis';
        } else if (!/^\d{5}$/.test(formData.customerZipCode)) {
            newErrors.customerZipCode = 'Le code postal doit contenir 5 chiffres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const receipt = await checkout(formData);
            onCheckout(receipt);
        } catch (error) {
            console.error('Erreur lors de la commande:', error);
            // L'erreur sera gérée par le composant parent
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Effacer l'erreur du champ quand l'utilisateur commence à taper
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-900">Finaliser la commande</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    {/* Récapitulatif du panier */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Récapitulatif de la commande</h3>
                        <div className="space-y-2 text-sm">
                            {cartItems?.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                    <span className="text-gray-600">
                                        {item.productId.name} × {item.quantity}
                                    </span>
                                    <span className="font-medium">
                                        {(item.productId.price * item.quantity).toFixed(2)} €
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-3 pt-3 flex justify-between font-semibold">
                            <span>Total:</span>
                            <span className="text-blue-600">{cartTotal?.toFixed(2)} €</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informations personnelles */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="customerName">
                                        Nom complet *
                                    </label>
                                    <input
                                        type="text"
                                        id="customerName"
                                        name="customerName"
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.customerName ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Jean Dupont"
                                    />
                                    {errors.customerName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="customerEmail">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="customerEmail"
                                        name="customerEmail"
                                        value={formData.customerEmail}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.customerEmail ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="jean.dupont@email.com"
                                    />
                                    {errors.customerEmail && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerEmail}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Adresse de livraison */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Adresse de livraison</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-medium" htmlFor="customerAddress">
                                        Adresse *
                                    </label>
                                    <input
                                        type="text"
                                        id="customerAddress"
                                        name="customerAddress"
                                        value={formData.customerAddress}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.customerAddress ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="123 Rue de la République"
                                    />
                                    {errors.customerAddress && (
                                        <p className="text-red-500 text-sm mt-1">{errors.customerAddress}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="customerCity">
                                            Ville *
                                        </label>
                                        <input
                                            type="text"
                                            id="customerCity"
                                            name="customerCity"
                                            value={formData.customerCity}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.customerCity ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="Paris"
                                        />
                                        {errors.customerCity && (
                                            <p className="text-red-500 text-sm mt-1">{errors.customerCity}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium" htmlFor="customerZipCode">
                                            Code postal *
                                        </label>
                                        <input
                                            type="text"
                                            id="customerZipCode"
                                            name="customerZipCode"
                                            value={formData.customerZipCode}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${errors.customerZipCode ? 'border-red-500' : 'border-gray-300'
                                                }`}
                                            placeholder="75001"
                                        />
                                        {errors.customerZipCode && (
                                            <p className="text-red-500 text-sm mt-1">{errors.customerZipCode}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations de paiement (simulé) */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-yellow-800">Paiement simulé</h4>
                                    <p className="text-yellow-700 text-sm mt-1">
                                        Cette application est une démonstration. Aucun paiement réel ne sera effectué.
                                        Votre commande sera traitée avec un paiement factice.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex space-x-4 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={isLoading}
                                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium transition duration-200"
                            >
                                Annuler
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Traitement en cours...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Confirmer la commande</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;