import mongoose from 'mongoose';

const storeSettingsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  taxRate: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },
  deliverySettings: {
    enableDelivery: { type: Boolean, default: true },
    deliveryRadius: { type: Number, default: 0 },
    minimumOrder: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    freeDeliveryAbove: { type: Number, default: 0 }
  },
  paymentSettings: {
    enableCashOnDelivery: { type: Boolean, default: true },
    enableOnlinePayment: { type: Boolean, default: false },
    merchantId: { type: String, default: '' },
    apiKey: { type: String, default: '' }
  }
}, { timestamps: true });

const StoreSetting = mongoose.model('StoreSetting', storeSettingsSchema);

export default StoreSetting;