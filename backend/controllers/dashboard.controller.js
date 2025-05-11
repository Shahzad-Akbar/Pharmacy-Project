import Order from '../models/order.model.js';
import User from '../models/user.model.js';
import Product from '../models/product.model.js';

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
        res.status(500).json({ error: error.message });
    }
};