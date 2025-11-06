import checkoutService from '../services/checkoutService.js';

//POST /api/checkout
const processCheckout = async (req, res) => {
    try {
        const { customerName, customerEmail } = req.body;

        const receipt = await checkoutService.processOrder(customerName, customerEmail);

        res.json(receipt);
    } catch (error) {
        if (error.message === 'Le panier est vide') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export default processCheckout;