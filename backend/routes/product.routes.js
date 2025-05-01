import express from 'express';
import { 
    createProduct, 
    getProducts, 
    getProduct, 
    updateProduct, 
    deleteProduct 
} from '../controllers/product.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/create-product', protectRoute, createProduct);
router.get('/get-products', getProducts);
router.get('/:id', getProduct);
router.put('/:id', protectRoute, updateProduct);
router.delete('/:id', protectRoute, deleteProduct);

export default router;