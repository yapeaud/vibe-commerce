import express from 'express';
import { getAllProducts, getCategories, getProductsByCategory, seedWithFakeStore, seedWithLocalData } from '../controllers/productController.js';

const productRouter = express.Router();

// GET /api/products - Récupérer tous les produits
productRouter.get('/', getAllProducts);

// GET /api/products/categories - Récupérer les catégories
productRouter.get('/categories', getCategories);

// GET /api/products/category/:category - Récupérer les produits par catégorie
productRouter.get('/category/:category', getProductsByCategory);

// POST /api/products/seed - Peupler la base avec des produits de Fake Store
productRouter.post('/seed', seedWithFakeStore);

// POST /api/products/local-seed - Peupler avec des produits locaux (fallback)
productRouter.post('/local-seed', seedWithLocalData);

export default productRouter;