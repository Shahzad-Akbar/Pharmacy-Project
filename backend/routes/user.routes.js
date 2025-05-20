import express from 'express';
import { 
    getUserProfile, 
    updateProfile, 
    updatePassword,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus
} from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

// Existing routes
router.get("/profile", protectRoute, getUserProfile);
router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-password", protectRoute, updatePassword);
router.post("/wishlist/:productId", protectRoute, addToWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);
router.get("/wishlist", protectRoute, getWishlist);

// New admin routes
router.get("/admin/user", protectRoute, getAllUsers);
router.post("/admin/user", protectRoute, createUser);
router.put("/admin/user/:id", protectRoute, updateUser);
router.delete("/admin/user/:id", protectRoute, deleteUser);
router.put("/admin/user/:id/status", protectRoute, updateUserStatus);

export default router;