import Prescription from '../models/prescription.model.js';
// import cloudinary from '../config/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';

// Upload prescription
export const uploadPrescription = async (req, res) => {
    try {
        const { doctorName, doctorContact, issueDate, expiryDate, image } = req.body;

        // Upload image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);

        const prescription = new Prescription({
            user: req.user._id,
            image: uploadResponse.secure_url,
            doctorName,
            doctorContact,
            issueDate,
            expiryDate
        });

        await prescription.save();
        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user prescriptions
export const getUserPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ user: req.user._id })
            .populate('products')
            .sort({ createdAt: -1 });
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single prescription
export const getPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id)
            .populate('products')
            .populate('verifiedBy', 'username');
            
        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        // Check if user is authorized
        if (prescription.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Not authorized" });
        }

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Link products to prescription
export const linkProducts = async (req, res) => {
    try {
        const { productIds } = req.body;
        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        prescription.products = productIds;
        await prescription.save();

        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Verify prescription (Admin only)
export const verifyPrescription = async (req, res) => {
    try {
        const { status, verificationNotes } = req.body;
        const prescription = await Prescription.findById(req.params.id);

        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        prescription.status = status;
        prescription.verificationNotes = verificationNotes;
        prescription.verifiedBy = req.user._id;
        prescription.verificationDate = Date.now();

        await prescription.save();
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all prescriptions (Admin only)
export const getAllPrescriptions = async (req, res) => {
    try {
        const { status, doctorName, startDate, endDate, verificationStatus } = req.query;

        // Build filter object
        const filter = {};

        // Add status filter
        if (status) {
            filter.status = status;
        }

        // Add doctor name filter (case-insensitive)
        if (doctorName) {
            filter.doctorName = { $regex: doctorName, $options: 'i' };
        }

        // Add date range filter
        if (startDate || endDate) {
            filter.createdAt = {};
            if (startDate) {
                filter.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                filter.createdAt.$lte = new Date(endDate);
            }
        }

        // Add verification status filter
        if (verificationStatus) {
            if (verificationStatus === 'verified') {
                filter.verifiedBy = { $ne: null };
            } else if (verificationStatus === 'unverified') {
                filter.verifiedBy = null;
            }
        }

        const prescriptions = await Prescription.find(filter)
            .populate('user', 'username email')
            .populate('products', 'name price stock') // Add relevant product fields
            .populate('verifiedBy', 'username')
            .sort({ createdAt: -1 });

        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ error: 'Failed to fetch prescriptions' });
    }
};