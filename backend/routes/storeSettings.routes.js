import express from 'express';
import { 
    getStoreSettings, 
    updateStoreSettings,
    updateDeliverySettings,
    updatePaymentSettings
} from '../controllers/storeSettings.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/', protectRoute, getStoreSettings);
router.put('/', protectRoute, updateStoreSettings);
router.put('/delivery', protectRoute, updateDeliverySettings);
router.put('/payment', protectRoute, updatePaymentSettings);

export default router;