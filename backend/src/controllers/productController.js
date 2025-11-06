import productModel from '../models/productModel.js';

// GET /api/products - Récupérer tous les produits
export const getProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Peupler la base avec des produits factices
export const seedProducts = async (req, res) => {
    try {
        const products = [
            { name: 'Smartphone', price: 599.99, description: 'Smartphone haut de gamme', category: 'Électronique' },
            { name: 'Casque Audio', price: 149.99, description: 'Casque sans fil premium', category: 'Électronique' },
            { name: 'Laptop', price: 1299.99, description: 'Ordinateur portable performant', category: 'Électronique' },
            { name: 'Livre React', price: 29.99, description: 'Guide complet de React', category: 'Livres' },
            { name: 'T-shirt', price: 19.99, description: 'T-shirt coton bio', category: 'Vêtements' },
            { name: 'Cafetière', price: 79.99, description: 'Machine à café automatique', category: 'Maison' },
            { name: 'Montre Connectée', price: 199.99, description: 'Montre fitness et notifications', category: 'Électronique' },
            { name: 'Sac à Dos', price: 49.99, description: 'Sac ergonomique pour ordinateur', category: 'Accessoires' }
        ];

        await productModel.deleteMany({});
        await productModel.insertMany(products);

        res.json({ message: 'Base de données peuplée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};