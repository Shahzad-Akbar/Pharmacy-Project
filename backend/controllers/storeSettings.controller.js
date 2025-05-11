import StoreSetting from '../models/storeSettings.model.js';

// Get store settings
export const getStoreSettings = async (req, res) => {
    try {
        const settings = await StoreSetting.findOne();
        if (!settings) {
            return res.status(404).json({ error: "Store settings not found" });
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

        let settings = await StoreSetting.findOne();

        if (settings) {
            settings.name = name || settings.name;
            settings.email = email || settings.email;
            settings.phone = phone || settings.phone;
            settings.address = address || settings.address;
            settings.taxRate = taxRate || settings.taxRate;
            settings.currency = currency || settings.currency;
        } else {
            settings = new StoreSetting({
                name,
                email,
                phone,
                address,
                taxRate,
                currency
            });
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
            return res.status(404).json({ error: "Store settings not found" });
        }

        settings.deliverySettings = {
            ...settings.deliverySettings,
            enableDelivery: enableDelivery !== undefined ? enableDelivery : settings.deliverySettings.enableDelivery,
            deliveryRadius: deliveryRadius || settings.deliverySettings.deliveryRadius,
            minimumOrder: minimumOrder || settings.deliverySettings.minimumOrder,
            deliveryFee: deliveryFee || settings.deliverySettings.deliveryFee,
            freeDeliveryAbove: freeDeliveryAbove || settings.deliverySettings.freeDeliveryAbove
        };

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
            return res.status(404).json({ error: "Store settings not found" });
        }

        settings.paymentSettings = {
            ...settings.paymentSettings,
            enableCashOnDelivery: enableCashOnDelivery !== undefined ? enableCashOnDelivery : settings.paymentSettings.enableCashOnDelivery,
            enableOnlinePayment: enableOnlinePayment !== undefined ? enableOnlinePayment : settings.paymentSettings.enableOnlinePayment,
            merchantId: merchantId || settings.paymentSettings.merchantId,
            apiKey: apiKey || settings.paymentSettings.apiKey
        };

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};