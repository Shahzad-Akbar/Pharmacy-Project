import express from 'express';
import { 
    addToCart, 
    getCart, 
    updateCartItem, 
    removeFromCart, 
    clearCart 
} from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/add', protectRoute, addToCart);
router.get('/', protectRoute, getCart);
router.put('/update', protectRoute, updateCartItem);
router.delete('/remove/:productId', protectRoute, removeFromCart);
router.delete('/clear', protectRoute, clearCart);

export default router;