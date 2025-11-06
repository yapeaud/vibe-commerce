import express from 'express';
import { getProducts, seedProducts } from '../controllers/productController.js';

const productRouter = express.Router();

// Route pour récupérer tous les produits
productRouter.get('/list', getProducts);

// Route pour peupler la base de données avec des produits factices
productRouter.post('/seed', seedProducts);

export default productRouter;