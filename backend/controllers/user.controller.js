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


// Get all users (admin only)
export const getAllUsers = async (req, res) => {
    try {
        // Check if the requesting user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new user (admin only)
export const createUser = async (req, res) => {
    try {
        // Check if the requesting user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        const {username, fullName, email, phone, address, city, state, pincode, password, role } = req.body;

        // Validate required fields
        if (!username || !fullName || !email || !phone || !password) {
            return res.status(400).json({ error: "Please provide all required fields" });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            fullName,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            password: hashedPassword,
            role: role || 'user',
            status: 'active'
        });

        await newUser.save();
        const userToReturn = { ...newUser.toObject() };
        delete userToReturn.password;

        res.status(201).json(userToReturn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user (admin only)
export const updateUser = async (req, res) => {
    try {
        // Check if the requesting user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        const { fullName, email, phone, address, role, password } = req.body;
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user fields
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.address.street = address?.street || user.address.street;
        user.address.city = address?.city || user.address.city;
        user.address.state = address?.state || user.address.state;
        user.address.postalCode = address?.postalCode || user.address.postalCode;
        user.role = role || user.role;

        // Update password if provided
        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        const userToReturn = { ...user.toObject() };
        delete userToReturn.password;

        res.status(200).json(userToReturn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete user (admin only)
export const deleteUser = async (req, res) => {
    try {
        // Check if the requesting user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user status (admin only)
export const updateUserStatus = async (req, res) => {
    try {
        // Check if the requesting user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: "Access denied. Admin only." });
        }

        const { status } = req.body;
        const userId = req.params.id;

        if (!['active', 'inactive', 'blocked'].includes(status)) {
            return res.status(400).json({ error: "Invalid status value" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.status = status;
        await user.save();

        res.status(200).json({ message: "User status updated successfully", status });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};