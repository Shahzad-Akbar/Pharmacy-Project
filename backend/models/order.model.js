import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    prescriptionRequired: { type: Boolean, default: false }
  }],
  total: { type: Number, required: true },
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in-transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'failed', 'refunded'],
    default: 'pending' 
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank-transfer'],
    required: true
  },
  deliveryCharge: { type: Number, default: 0 },
  tracking: { type: String },
  prescription: { type: mongoose.Schema.Types.ObjectId, ref: 'Prescription' },
  notes: { type: String },
  estimatedDeliveryDate: { type: Date },
  actualDeliveryDate: { type: Date }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;