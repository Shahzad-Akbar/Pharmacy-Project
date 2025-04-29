import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'processing', 'in-transit', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: { type: String, required: true },
  paymentStatus: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  deliveryCharge: Number,
  tracking: String
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;