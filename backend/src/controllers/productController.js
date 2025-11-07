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
            { name: 'Smartphone', price: 599.99, description: 'Smartphone haut de gamme', category: 'Électronique', image: 'https://media.rueducommerce.fr/ld/products/00/06/20/62/LD0006206200.jpg' },
            { name: 'Casque Audio', price: 149.99, description: 'Casque sans fil premium', category: 'Électronique', image: 'https://www.groupeh4.com/43982/casque-audio-bluetooth-premium-aspect-cuir-noir-mains-libres-muse.jpg' },
            { name: 'Laptop', price: 1299.99, description: 'Ordinateur portable performant', category: 'Électronique', image: 'https://saudewala.in/cdn/shop/collections/Laptop.jpg?v=1732216115&width=1000' },
            { name: 'Livre React', price: 29.99, description: 'Guide complet de React', category: 'Livres', image: 'https://static.fnac-static.com/multimedia/PE/Images/FR/NR/1a/fe/f5/16121370/1540-1/tsp20240329083851/React-Developpez-le-Front-End-de-vos-applications-web-et-mobiles-avec-JavaScript-nouvelle-edition.jpg' },
            { name: 'T-shirt', price: 19.99, description: 'T-shirt coton bio', category: 'Vêtements', image: 'https://albertocerriteno.com/wp-content/uploads/2021/09/Nike-Vintage-T-Shirt.jpg' },
            { name: 'Cafetière', price: 79.99, description: 'Machine à café automatique', category: 'Maison', image: 'https://sociam.ci/gestion/products/859845dd-8ee5-4720-b6d7-977085b64ce0.jpg' },
            { name: 'Montre Connectée', price: 199.99, description: 'Montre fitness et notifications', category: 'Électronique', image: 'https://example.com/montre.image' },
            { name: 'Sac à Dos', price: 49.99, description: 'Sac ergonomique pour ordinateur', category: 'Accessoires', image: 'https://ci.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/38/378992/1.jpg?9999' },
        ];

        await productModel.deleteMany({});
        await productModel.insertMany(products);

        res.json({ message: 'Base de données peuplée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};