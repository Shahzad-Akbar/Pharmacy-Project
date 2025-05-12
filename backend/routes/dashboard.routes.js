import express from 'express';
import { getDashboardStats, getAdminDashboardStats } from '../controllers/dashboard.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/stats', protectRoute, getDashboardStats);
router.get('/admin/stats', protectRoute, getAdminDashboardStats);

export default router;