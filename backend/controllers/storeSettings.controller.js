import StoreSetting from '../models/storeSettings.model.js';

// Get store settings
export const getStoreSettings = async (req, res) => {
    try {
        let settings = await StoreSetting.findOne();
        if (!settings) {
            // Create default settings if none exist
            settings = new StoreSetting({
                name: 'My Pharmacy',
                email: 'pharmacy@example.com'
            });
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update store settings
export const updateStoreSettings = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            phone, 
            address, 
            taxRate, 
            currency 
        } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }

        let settings = await StoreSetting.findOne();

        if (!settings) {
            settings = new StoreSetting({
                name,
                email,
                phone,
                address,
                taxRate,
                currency
            });
        } else {
            settings.name = name;
            settings.email = email;
            settings.phone = phone || settings.phone;
            settings.address = address || settings.address;
            settings.taxRate = taxRate || settings.taxRate;
            settings.currency = currency || settings.currency;
        }

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update delivery settings
export const updateDeliverySettings = async (req, res) => {
    try {
        const { 
            enableDelivery,
            deliveryRadius,
            minimumOrder,
            deliveryFee,
            freeDeliveryAbove
        } = req.body;

        let settings = await StoreSetting.findOne();
        if (!settings) {
            settings = new StoreSetting({
                name: 'My Pharmacy',
                email: 'pharmacy@example.com',
                deliverySettings: {
                    enableDelivery,
                    deliveryRadius,
                    minimumOrder,
                    deliveryFee,
                    freeDeliveryAbove
                }
            });
        } else {
            settings.deliverySettings = {
                enableDelivery: enableDelivery !== undefined ? enableDelivery : settings.deliverySettings.enableDelivery,
                deliveryRadius: deliveryRadius !== undefined ? deliveryRadius : settings.deliverySettings.deliveryRadius,
                minimumOrder: minimumOrder !== undefined ? minimumOrder : settings.deliverySettings.minimumOrder,
                deliveryFee: deliveryFee !== undefined ? deliveryFee : settings.deliverySettings.deliveryFee,
                freeDeliveryAbove: freeDeliveryAbove !== undefined ? freeDeliveryAbove : settings.deliverySettings.freeDeliveryAbove
            };
        }

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update payment settings
export const updatePaymentSettings = async (req, res) => {
    try {
        const { 
            enableCashOnDelivery,
            enableOnlinePayment,
            merchantId,
            apiKey
        } = req.body;

        let settings = await StoreSetting.findOne();
        if (!settings) {
            settings = new StoreSetting({
                name: 'My Pharmacy',
                email: 'pharmacy@example.com',
                paymentSettings: {
                    enableCashOnDelivery,
                    enableOnlinePayment,
                    merchantId,
                    apiKey
                }
            });
        } else {
            settings.paymentSettings = {
                enableCashOnDelivery: enableCashOnDelivery !== undefined ? enableCashOnDelivery : settings.paymentSettings.enableCashOnDelivery,
                enableOnlinePayment: enableOnlinePayment !== undefined ? enableOnlinePayment : settings.paymentSettings.enableOnlinePayment,
                merchantId: merchantId || settings.paymentSettings.merchantId,
                apiKey: apiKey || settings.paymentSettings.apiKey
            };
        }

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};