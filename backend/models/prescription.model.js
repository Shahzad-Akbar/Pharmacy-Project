import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: String, required: true },
  image: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'expired', 'rejected'],
    default: 'active'
  },
  expiryDate: { type: Date, required: true },
  uploadDate: { type: Date, default: Date.now }
}, { timestamps: true });

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;