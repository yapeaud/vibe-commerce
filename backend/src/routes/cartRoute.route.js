import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

// Route pour récupérer le panier
cartRouter.get('/cart', getCart);

// Route pour ajouter un produit au panier
cartRouter.post('/cart', addToCart);

// Route pour supprimer un produit du panier
cartRouter.delete('/cart/:productId', removeFromCart);

export default cartRouter;