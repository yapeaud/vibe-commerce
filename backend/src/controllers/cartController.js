import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

// Fonction utilitaire pour calculer le total du panier
const calculateCartTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
        total += item.productId.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
};

// GET /api/cart - Récupérer le panier de l'utilisateur
const getCart = async (req, res) => {
    try {
        let cart = await cartModel.findOne({ userId: 'default-user' }).populate('items.productId');

        if (!cart) {
            cart = new cartModel({ userId: 'default-user', items: [] });
            await cart.save();
        }

        const total = calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/cart - Ajouter un produit au panier
const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await cartModel.findOne({ userId: 'default-user' });
        if (!cart) {
            cart = new cartModel({ userId: 'default-user', items: [] });
        }

        // Vérifier si le produit existe
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Produit non trouvé' });
        }

        // Vérifier si le produit est déjà dans le panier
        const existingItem = cart.items.find(item => item.productId.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        cart.updatedAt = new Date();
        await cart.save();

        await cart.populate('items.productId');

        const total = calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE /api/cart/:id - Supprimer un élément du panier
const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: 'default-user' });

        if (!cart) {
            return res.status(404).json({ message: 'Panier non trouvé' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
        cart.updatedAt = new Date();
        await cart.save();

        await cart.populate('items.productId');

        const total = calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Exporter les fonctions du contrôleur
export {
    addToCart,
    removeFromCart,
    getCart
};