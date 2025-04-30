import {generateTokenAndSetCookie} from '../lib/utils/generateToken.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const signup = async (req, res) => {
    try {
        const { username, fullName, email, password, phone } = req.body;

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email or username'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
            phone
        });

        if(password.length < 6){
            return res.status(400).json({error: "Password must be at least 6 characters long"});
        }

        if(newUser){
        generateTokenAndSetCookie(newUser._id, res);
        newUser.save();

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
            address: newUser.address,
            phone: newUser.phone,
            profileImg: newUser.profileImg,
            isActive: newUser.isActive,            
        })

        }else{
            res.status(400).json({
                success: false,
                message: 'Invalid User data'
            });
        }
    } catch (error) {
        console.error("error in signup controller", error.message);
        res.status(500).json({
            success: false,
            message: 'Error in registration',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            address: user.address,
            phone: user.phone,
            profileImg: user.profileImg,
            isActive: user.isActive,
        });

        
    } catch (error) {
        console.error("error in login controller", error.message);
        res.status(500).json({
            success: false,
            message: 'Error in login',
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt","", {maxage: 0});
        
        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in logout',
            error: error.message
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user); 
    }catch(error){
        console.error("error in getMe controller", error.message);
        res.status(500).json({error: "internal server error"});
    } 
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User with this email does not exist" });
        }

        // Generate unique reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

        await user.save();

        // Send reset token directly in email
        const message = `
            <h2>Hello ${user.fullName}</h2>
            <p>You requested a password reset for your Pharmacy account.</p>
            <p>Here is your password reset token:</p>
            <h3>${resetToken}</h3>
            <p>Use this token to reset your password.</p>
            <p><strong>This token will expire in 10 minutes.</strong></p>
        `;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token - Pharmacy Website',
            html: message
        });

        res.status(200).json({
            success: true,
            message: "Password reset token sent to your email"
        });

    } catch (error) {
       
        console.error("Error in forgotPassword:", error);
        res.status(500).json({ error: "Failed to send reset email. Please try again later." });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;

        if (!resetToken || !newPassword) {
            return res.status(400).json({ error: "Please provide both reset token and new password" });
        }

        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired reset link. Please request a new one." });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Set new password and clear reset token
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        // Send confirmation email
        const message = `
            <h2>Hello ${user.fullName}</h2>
            <p>Your password has been successfully reset.</p>
            <p>If you didn't make this change, please contact our support team immediately.</p>
        `;

        await sendEmail({
            email: user.email,
            subject: 'Password Reset Successful',
            html: message
        });

        res.status(200).json({
            success: true,
            message: "Password reset successful. You can now login with your new password."
        });
    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ error: "Failed to reset password. Please try again." });
    }
};