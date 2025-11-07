import axios from 'axios';

// Configuration de base d'Axios
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
    },
});

// Intercepteur pour les requêtes
apiClient.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Intercepteur pour les réponses
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);

        // Gestion centralisée des erreurs
        if (error.response) {
            // Le serveur a répondu avec un code d'erreur
            const message = error.response.data?.message || 'Une erreur est survenue';
            throw new Error(message);
        } else if (error.request) {
            // La requête a été faite mais aucune réponse n'a été reçue
            throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion.');
        } else {
            // Une erreur s'est produite lors de la configuration de la requête
            throw new Error('Erreur de configuration de la requête');
        }
    }
);

// Fonctions API
export const getProducts = async () => {
    try {
        const response = await apiClient.get('/products/list');
        return response.data;
    } catch (error) {
        throw new Error(`Échec de la récupération des produits: ${error.message}`);
    }
};

export const getCart = async () => {
    try {
        const response = await apiClient.get('/cart');
        return response.data;
    } catch (error) {
        throw new Error(`Échec de la récupération du panier: ${error.message}`);
    }
};

export const addToCart = async (productId, quantity) => {
    try {
        const response = await apiClient.post('/cart', { productId, quantity });
        return response.data;
    } catch (error) {
        throw new Error(`Échec de l'ajout au panier: ${error.message}`);
    }
};

export const removeFromCart = async (productId) => {
    try {
        const response = await apiClient.delete(`/cart/${productId}`);
        return response.data;
    } catch (error) {
        throw new Error(`Échec de la suppression du panier: ${error.message}`);
    }
};

export const checkout = async (customerData) => {
    try {
        const response = await apiClient.post('/checkout', customerData);
        return response.data;
    } catch (error) {
        throw new Error(`Échec de la commande: ${error.message}`);
    }
};

export const seedProducts = async () => {
    try {
        const response = await apiClient.post('/products/seed');
        return response.data;
    } catch (error) {
        throw new Error(`Échec du peuplement des produits: ${error.message}`);
    }
};

// Vérification de la santé de l'API
export const healthCheck = async () => {
    try {
        const response = await apiClient.get('/products/list');
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

export default apiClient;