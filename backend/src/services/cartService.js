import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

const getOrCreateCart = async (userId = 'default-user') => {
    let cart = await cartModel.findOne({ userId }).populate('items.productId');
    if (!cart) {
        cart = new cartModel({ userId, items: [] });
        await cart.save();
    }
    return cart;
};

const calculateCartTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
        total += item.productId.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
};

const addItemToCart = async (userId, productId, quantity) => {
    const cart = await getOrCreateCart(userId);
    const product = await productModel.findById(productId);

    if (!product) {
        throw new Error('Produit non trouvé');
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({ productId, quantity });
    }

    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.productId');

    return cart;
};

const removeItemFromCart = async (userId, productId) => {
    const cart = await getOrCreateCart(userId);
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.updatedAt = new Date();
    await cart.save();
    await cart.populate('items.productId');

    return cart;
};

export default {
    getOrCreateCart,
    calculateCartTotal,
    addItemToCart,
    removeItemFromCart
};