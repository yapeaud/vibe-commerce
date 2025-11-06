import cartModel from "../models/cartModel.js";

// Générer un ID de commande unique
const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};

// Calculer le total du panier
const calculateCartTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
        total += item.productId.price * item.quantity;
    });
    return parseFloat(total.toFixed(2));
};

// Traiter une commande complète
const processOrder = async (customerName, customerEmail) => {
    const cart = await cartModel.findOne({ userId: 'default-user' }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
        throw new Error('Le panier est vide');
    }

    // Calculer le total
    const total = calculateCartTotal(cart);

    // Générer un reçu factice
    const receipt = {
        orderId: generateOrderId(),
        customerName,
        customerEmail,
        items: cart.items.map(item => ({
            product: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price,
            subtotal: item.productId.price * item.quantity
        })),
        total: total,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };

    // Vider le panier après la commande
    cart.items = [];
    cart.updatedAt = new Date();
    await cart.save();

    return receipt;
};

export default { processOrder, generateOrderId, calculateCartTotal };