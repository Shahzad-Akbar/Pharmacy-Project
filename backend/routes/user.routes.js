import express from 'express';
import { 
    getUserProfile, 
    updateProfile, 
    updatePassword,
    addToWishlist,
    removeFromWishlist,
    getWishlist,
} from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.put("/update-profile", protectRoute, updateProfile);
router.put("/update-password", protectRoute, updatePassword);
router.post("/wishlist/:productId", protectRoute, addToWishlist);
router.delete("/wishlist/:productId", protectRoute, removeFromWishlist);
router.get("/wishlist", protectRoute, getWishlist);

export default router;