import cartService from '../services/cartService.js';

const getCart = async (req, res) => {
    try {
        const cart = await cartService.getOrCreateCart('default-user');
        const total = cartService.calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await cartService.addItemToCart('default-user', productId, quantity);
        const total = cartService.calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        if (error.message === 'Produit non trouvé') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const cart = await cartService.removeItemFromCart('default-user', req.params.id);
        const total = cartService.calculateCartTotal(cart);

        res.json({
            items: cart.items,
            total: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getCart,
    addToCart,
    removeFromCart
};