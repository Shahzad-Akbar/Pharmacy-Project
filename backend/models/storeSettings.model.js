import mongoose from 'mongoose';

const storeSettingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  taxRate: Number,
  currency: { type: String, default: 'INR' },
  deliverySettings: {
    enableDelivery: { type: Boolean, default: true },
    deliveryRadius: Number,
    minimumOrder: Number,
    deliveryFee: Number,
    freeDeliveryAbove: Number
  },
  paymentSettings: {
    enableCashOnDelivery: { type: Boolean, default: true },
    enableOnlinePayment: { type: Boolean, default: true },
    merchantId: String,
    apiKey: String
  }
}, { timestamps: true });

const StoreSetting = mongoose.model('StoreSetting', storeSettingsSchema);

export default StoreSetting;