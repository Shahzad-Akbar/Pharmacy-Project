import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    doctorName: {
        type: String,
        required: true
    },
    doctorContact: {
        type: String,
        required: true
    },
    issueDate: {
        type: Date,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    verificationNotes: {
        type: String
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verificationDate: {
        type: Date
    }
}, { timestamps: true });

export default mongoose.model('Prescription', prescriptionSchema);