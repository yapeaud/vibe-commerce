import express from 'express';
import processCheckout from '../controllers/checkoutController.js';

const checkoutRouter = express.Router();

// POST /api/checkout
checkoutRouter.post('/', processCheckout);

export default checkoutRouter;