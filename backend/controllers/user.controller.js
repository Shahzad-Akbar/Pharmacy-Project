import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {v2 as cloudinary} from 'cloudinary';

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findOne(userId).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { fullName, email, phone, address } = req.body;
        let { profileImg } = req.body;

        if (profileImg) {
			const uploadedResponse = await cloudinary.uploader.upload(profileImg);
			profileImg = uploadedResponse.secure_url;
		}

        const user = await User.findById(req.user._id);
        
        if (!user) return res.status(404).json({ error: "User not found" });

        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.profileImg = profileImg || user.profileImg;

        const updatedUser = await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.log("error in updateProfile controller", error.message)
        res.status(500).json({ error: error.message });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Current password is incorrect" });

        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await User.findById(req.user._id);

        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const productId = req.params.productId;
        const user = await User.findById(req.user._id);

        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('wishlist');
        res.status(200).json({
            success: true,
            wishlist: user.wishlist
        });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}