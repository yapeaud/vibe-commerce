import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
    if (!receipt) return null;

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-green-600">Commande Confirmée !</h2>
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
                    {/* En-tête du reçu */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Merci pour votre achat !</h3>
                        <p className="text-gray-600">Votre commande a été traitée avec succès.</p>
                    </div>

                    {/* Informations de la commande */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold text-gray-700">Numéro de commande:</span>
                                <p className="text-gray-900 font-mono">{receipt.orderId}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Date:</span>
                                <p className="text-gray-900">{formatDate(receipt.timestamp)}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Client:</span>
                                <p className="text-gray-900">{receipt.customerName}</p>
                            </div>
                            <div>
                                <span className="font-semibold text-gray-700">Email:</span>
                                <p className="text-gray-900">{receipt.customerEmail}</p>
                            </div>
                            <div className="md:col-span-2">
                                <span className="font-semibold text-gray-700">Statut:</span>
                                <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    {receipt.status === 'confirmed' ? 'Confirmée' : receipt.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Détails des articles */}
                    <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-4">Détails de la commande</h4>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Produit
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantité
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Prix
                                        </th>
                                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {receipt.items.map((item, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-3 text-sm text-gray-900">
                                                {item.product}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                                {item.quantity}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 text-right">
                                                {item.price.toFixed(2)} €
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                                                {item.subtotal.toFixed(2)} €
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td colSpan="3" className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                                            Total:
                                        </td>
                                        <td className="px-4 py-3 text-sm font-bold text-blue-600 text-right">
                                            {receipt.total.toFixed(2)} €
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>

                    {/* Informations de livraison */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-start space-x-3">
                            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-semibold text-blue-800">Informations de livraison</h4>
                                <p className="text-blue-700 text-sm mt-1">
                                    Un email de confirmation a été envoyé à {receipt.customerEmail}.
                                    Vous recevrez un email de suivi lorsque votre commande sera expédiée.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={onClose}
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200"
                        >
                            Retour à la boutique
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            <span>Imprimer le reçu</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;