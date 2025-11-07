import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
    return (
        <main className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <section className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <article className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Commande Confirmée!</h2>
                        <p className="text-gray-600">Merci pour votre achat</p>
                    </article>

                    <article className="border-b pb-4 mb-4">
                        <p><strong>Numéro de commande:</strong> {receipt.orderId}</p>
                        <p><strong>Client:</strong> {receipt.customerName}</p>
                        <p><strong>Email:</strong> {receipt.customerEmail}</p>
                        <p><strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
                    </article>

                    <article className="mb-6">
                        <h3 className="font-semibold mb-2">Articles commandés:</h3>
                        {receipt.items.map((item, index) => (
                            <div key={index} className="flex justify-between py-2 border-b">
                                <span>{item.product} × {item.quantity}</span>
                                <span>{item.subtotal.toFixed(2)} €</span>
                            </div>
                        ))}
                    </article>

                    <article className="border-t pt-4">
                        <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span>{receipt.total.toFixed(2)} €</span>
                        </div>
                    </article>

                    <article className="mt-6 text-center">
                        <p className="text-gray-600 mb-4">
                            Un email de confirmation a été envoyé à {receipt.customerEmail}
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-200"
                        >
                            Retour à la boutique
                        </button>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default ReceiptModal;