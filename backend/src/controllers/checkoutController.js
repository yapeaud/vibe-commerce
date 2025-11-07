import checkoutService from '../services/checkoutService.js';

// POST /api/checkout
const processCheckout = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerAddress,
            customerCity,
            customerZipCode
        } = req.body;

        // Validation basique des champs
        if (!customerName || !customerEmail || !customerAddress || !customerCity || !customerZipCode) {
            return res.status(400).json({ message: 'Tous les champs client sont requis.' });
        }

        // Transmet tous les champs au service
        const receipt = await checkoutService.processOrder({
            customerName,
            customerEmail,
            customerAddress,
            customerCity,
            customerZipCode
        });

        res.status(200).json(receipt);
    } catch (error) {
        if (error.message === 'Le panier est vide') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Erreur lors du checkout:', error);
        res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
    }
};

export default processCheckout;