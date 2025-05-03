import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

// Add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        // Find product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check stock
        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if product exists in cart
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.price = product.price * existingItem.quantity;
        } else {
            cart.items.push({
                product: productId,
                quantity,
                price: product.price * quantity
            });
        }

        // Update total amount
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        // Check if any product requires prescription
        cart.prescriptionRequired = cart.items.some(item => product.requiresPrescription);

        await cart.save();
        
        // Populate product details
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        if (!cart) {
            return res.status(200).json({ items: [], totalAmount: 0 });
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });
        
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({ error: "Insufficient stock" });
        }

        const cartItem = cart.items.find(item => item.product.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ error: "Item not found in cart" });
        }

        cartItem.quantity = quantity;
        cartItem.price = product.price * quantity;
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove from cart
export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);
        cart.totalAmount = cart.items.reduce((total, item) => total + item.price, 0);

        await cart.save();
        await cart.populate('items.product');

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        cart.items = [];
        cart.totalAmount = 0;
        cart.prescriptionRequired = false;

        await cart.save();
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};