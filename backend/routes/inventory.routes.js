import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import {
    getInventoryStatus,
    updateStock,
    restockProduct,
    getLowStockProducts,
    getExpiredProducts
} from '../controllers/inventory.controller.js';

const router = express.Router();

// Get inventory status
router.get('/',protectRoute, getInventoryStatus);

// Update stock level
router.put('/stock/:id',protectRoute, updateStock);

// Restock product
router.post('/restock/:id',protectRoute, restockProduct);

// Get low stock products
router.get('/low-stock',protectRoute, getLowStockProducts);

// Get expired products
router.get('/expired',protectRoute, getExpiredProducts);

export default router