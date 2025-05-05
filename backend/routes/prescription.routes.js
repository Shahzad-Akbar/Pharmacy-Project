import express from 'express';
import { 
    uploadPrescription,
    getUserPrescriptions,
    getPrescription,
    linkProducts,
    verifyPrescription
} from '../controllers/prescription.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/upload', protectRoute, uploadPrescription);
router.get('/user', protectRoute, getUserPrescriptions);
router.get('/:id', protectRoute, getPrescription);
router.put('/:id/link-products', protectRoute, linkProducts);
router.put('/:id/verify', protectRoute, verifyPrescription);

export default router;