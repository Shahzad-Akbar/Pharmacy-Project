import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Prescription from '../models/prescription.model.js';

export const getDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments({ user: req.user._id });
        const pendingOrders = await Order.countDocuments({ 
            user: req.user._id,
            status: 'pending'
        });
        const activePrescriptions = await Prescription.countDocuments({
            user: req.user._id,
            status: 'approved',
            expiryDate: { $gt: new Date() }
        });
        const lastOrder = await Order.findOne({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({
            totalOrders,
            pendingOrders,
            activePrescriptions,
            lastOrderDate: lastOrder?.createdAt
        });
    } catch (error) {
        console.error("Error in getDashboardStats:", error);
        res.status(500).json({ 
            error: "Failed to fetch dashboard stats",
            details: error.message 
        });
    }
};

// Add admin dashboard stats
export const getAdminDashboardStats = async (req, res) => {
    try {
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: 'pending' });
        const totalUsers = await User.countDocuments();
        const lowStockProducts = await Product.countDocuments({ stock: { $lte: 10 } });
        
        // Get total sales
        const orders = await Order.find({ status: { $ne: 'cancelled' } });
        const totalSales = orders.reduce((acc, order) => acc + order.total, 0);

        // Get recent orders
        const recentOrders = await Order.find()
            .populate('user', 'name')
            .sort({ createdAt: -1 })
            .limit(5);

        // Get low stock items
        const lowStockItems = await Product.find({ stock: { $lte: 10 } })
            .select('name stock')
            .limit(5);

        res.status(200).json({
            totalSales,
            totalOrders,
            pendingOrders,
            totalUsers,
            lowStockProducts,
            recentOrders,
            lowStockItems
        });
    } catch (error) {
        console.error("Error in getAdminDashboardStats:", error);
        res.status(500).json({ 
            error: "Failed to fetch admin dashboard stats",
            details: error.message 
        });
    }
};