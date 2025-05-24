import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import {
    getDashboardStats,
    getRecentNotifications,
    getRecentOrders,
    getAdminDashboardStats,
    getLowStockProducts,
    getRecentAdminOrders
} from '../controllers/dashboard.controller.js';

const router = express.Router()
router.get('/stats', protectRoute, getDashboardStats)
router.get('/notifications/recent', protectRoute, getRecentNotifications)
router.get('/orders/recent', protectRoute, getRecentOrders)

router.get('/admin/stats', protectRoute, getAdminDashboardStats)
router.get('/admin/low-stock', protectRoute, getLowStockProducts)
router.get('/admin/recent-order', protectRoute, getRecentAdminOrders)
export default router