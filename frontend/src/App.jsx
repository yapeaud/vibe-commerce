import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import ReceiptModal from './components/ReceiptModal';
import ApiStatus from './components/ApiStatus';
import { 
  getProducts, 
  getCart, 
  addToCart, 
  removeFromCart, 
  checkout, 
  healthCheck,
  seedProducts 
} from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const [apiStatus, setApiStatus] = useState('checking');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Vérifier le statut de l'API
      const isHealthy = await healthCheck();
      setApiStatus(isHealthy ? 'healthy' : 'error');
      
      if (isHealthy) {
        await loadProducts();
        await loadCart();
      } else {
        setError('Impossible de se connecter au serveur. Vérifiez que le backend est en cours d\'exécution.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'initialisation:', err);
      setApiStatus('error');
      setError('Erreur lors du chargement de l\'application');
    } finally {
      setLoading(false);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      
      // Si aucun produit n'est disponible, peupler la base de données
      if (data.length === 0) {
        await seedProducts();
        const refreshedData = await getProducts();
        setProducts(refreshedData);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setError('Erreur lors du chargement des produits');
      throw error;
    }
  };

  const loadCart = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      // Ne pas bloquer l'application pour une erreur de panier
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setError(null);
      const data = await addToCart(productId, 1);
      setCart(data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      setError(`Erreur: ${error.message}`);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      setError(null);
      const data = await removeFromCart(productId);
      setCart(data);
    } catch (error) {
      console.error('Erreur lors de la suppression du panier:', error);
      setError(`Erreur: ${error.message}`);
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      setError(null);
      const receiptData = await checkout(customerData);
      setReceipt(receiptData);
      setShowCheckout(false);
      setActiveTab('products');
      
      // Recharger le panier (qui devrait être vide)
      await loadCart();
    } catch (error) {
      console.error('Erreur lors de la commande:', error);
      setError(`Erreur lors de la commande: ${error.message}`);
    }
  };

  const handleRetry = () => {
    initializeApp();
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  // Affichage du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'application...</p>
        </div>
      </div>
    );
  }

  // Affichage des erreurs critiques
  if (error && products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erreur de chargement</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Vibe Commerce</h1>
              <p className="text-sm text-gray-500">
                {/* Environnement: {import.meta.env.VITE_ENVIRONMENT} */}
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-lg transition duration-200 ${
                  activeTab === 'products' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveTab('products')}
              >
                Produits
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition duration-200 relative ${
                  activeTab === 'cart' 
                    ? 'bg-blue-500 text-white shadow-md' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setActiveTab('cart')}
              >
                Panier
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Statut de l'API */}
      <ApiStatus status={apiStatus} />

      {/* Message d'erreur non critique */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
            <span className="block sm:inline">{error}</span>
            <button
              className="absolute top-0 right-0 py-3 px-4"
              onClick={() => setError(null)}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && (
          <ProductList 
            products={products} 
            onAddToCart={handleAddToCart}
            loading={loading}
          />
        )}
        
        {activeTab === 'cart' && (
          <Cart 
            cart={cart} 
            onRemoveFromCart={handleRemoveFromCart}
            onCheckout={() => setShowCheckout(true)}
            loading={loading}
          />
        )}
      </main>

      {/* Formulaire de commande */}
      {showCheckout && (
        <CheckoutForm
          onClose={() => setShowCheckout(false)}
          onCheckout={handleCheckout}
          cartTotal={cart.total}
          cartItems={cart.items}
        />
      )}

      {/* Modal de reçu */}
      {receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={() => setReceipt(null)}
        />
      )}

      {/* Pied de page */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Vibe Commerce - Application de démonstration</p>
            <p className="mt-2">
              API: {import.meta.env.VITE_BACKEND_URL}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;