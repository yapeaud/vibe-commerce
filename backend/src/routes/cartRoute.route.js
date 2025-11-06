import express from 'express';
import { getCart, addToCart, removeFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

// Route pour récupérer le panier
cartRouter.get('/', getCart);

// Route pour ajouter un produit au panier
cartRouter.post('/', addToCart);

// Route pour supprimer un produit du panier
cartRouter.delete('/:productId', removeFromCart);

export default cartRouter;