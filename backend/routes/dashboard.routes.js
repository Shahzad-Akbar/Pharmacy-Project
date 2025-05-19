import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import {
    getDashboardStats,
    getRecentNotifications,
    getRecentOrders
} from '../controllers/dashboard.controller.js';

const router = express.Router()
router.get('/stats', protectRoute, getDashboardStats)
router.get('/notifications/recent', protectRoute, getRecentNotifications)
router.get('/orders/recent', protectRoute, getRecentOrders)

export default router