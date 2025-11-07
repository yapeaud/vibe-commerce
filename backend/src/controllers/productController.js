import productModel from '../models/productModel.js';
import axios from 'axios';

// Récupérer tous les produits
const getAllProducts = async (req, res) => {
    try {
        const useFakeStore = process.env.USE_FAKE_STORE === 'true';

        if (useFakeStore) {
            console.log("Fetching products from Fake Store API...");
            const response = await axios.get('https://fakestoreapi.com/products'); // URL corrigée
            const fakeProducts = response.data;

            const transformedProducts = fakeProducts.map(product => ({
                _id: `fake_${product.id}`,
                name: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
                rating: product.rating?.rate,
                count: product.rating?.count,
                externalId: product.id
            }));
            return res.json(transformedProducts);
        } else {
            console.log("Fetching products from local database...");
            const products = await Product.find();
            return res.json(products);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);

        // Fallback: essayer de récupérer depuis la base de données en cas d'erreur API
        try {
            console.log("Fallback: Fetching from local database after API error...");
            const products = await Product.find();
            return res.json(products);
        } catch (fallbackError) {
            return res.status(500).json({
                message: 'Erreur lors de la récupération des produits',
                error: error.message
            });
        }
    }
};

// Récupérer les catégories
const getCategories = async (req, res) => {
    try {
        const useFakeStore = process.env.USE_FAKE_STORE === 'true';

        if (useFakeStore) {
            console.log("Fetching categories from Fake Store API...");
            const response = await axios.get('https://fakestoreapi.com/products/categories'); // URL corrigée
            return res.json(response.data);
        } else {
            console.log("Fetching categories from local database...");
            const categories = await Product.distinct('category');
            return res.json(categories);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Récupérer les produits par catégorie
const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const useFakeStore = process.env.USE_FAKE_STORE === 'true';

        if (useFakeStore) {
            console.log(`Fetching products for category '${category}' from Fake Store API...`);
            const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`); // URL corrigée
            const fakeProducts = response.data;

            const transformedProducts = fakeProducts.map(product => ({
                _id: `fake_${product.id}`,
                name: product.title,
                price: product.price,
                description: product.description,
                image: product.image,
                category: product.category,
                rating: product.rating?.rate,
                count: product.rating?.count,
                externalId: product.id
            }));

            return res.json(transformedProducts);
        } else {
            console.log(`Fetching products for category '${category}' from local database...`);
            const products = await Product.find({ category });
            return res.json(products);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des produits par catégorie:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Peupler la base avec des produits de Fake Store
const seedWithFakeStore = async (req, res) => {
    try {
        console.log("Seeding database with Fake Store products...");
        const response = await axios.get('https://fakestoreapi.com/products?limit=10');
        const fakeProducts = response.data;

        const productsToSave = fakeProducts.map(product => ({
            name: product.title,
            price: product.price,
            description: product.description,
            image: product.image,
            category: product.category,
            rating: product.rating?.rate,
            count: product.rating?.count,
            externalId: product.id
        }));

        await Product.deleteMany({});
        await Product.insertMany(productsToSave);

        return res.json({
            message: 'Base de données peuplée avec les produits de Fake Store',
            count: productsToSave.length
        });

    } catch (error) {
        console.error('Erreur lors du peuplement avec Fake Store:', error);
        return res.status(500).json({ message: error.message });
    }
};

// Peupler avec des produits locaux (fallback)
const seedWithLocalData = async (req, res) => {
    try {
        console.log("Seeding database with local fallback products...");
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

        await Product.deleteMany({});
        await Product.insertMany(products);

        return res.json({ message: 'Base de données peuplée avec les produits locaux', count: products.length });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { getAllProducts, getProductsByCategory, seedWithFakeStore, seedWithLocalData };