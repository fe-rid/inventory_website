const express = require('express');
const router  = express.Router();
const Product = require('../models/Product');

function requireAuth(req, res, next) {
    if (!req.session.userId)
        return res.json({ success: false, redirect: 'index.html' });
    next();
}

function requireAdmin(req, res, next) {
    if (req.session.role !== 'admin')
        return res.json({ success: false, message: 'Admin access required.' });
    next();
}

// GET /api/products         - list all
router.get('/products', requireAuth, async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json({ success: true, data: products.map(mapProduct) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// GET /api/products/:id     - single product
router.get('/products/:id', requireAuth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.json({ success: false, message: 'Not found.' });
        res.json({ success: true, data: mapProduct(product) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// POST /api/products - create or update
router.post('/products', requireAuth, requireAdmin, async (req, res) => {
    try {
        const { product_id, product_name, category, price, low_stock_threshold } = req.body;

        if (product_id) {
            // Update
            const updated = await Product.findByIdAndUpdate(
                product_id,
                { product_name, category, price: parseFloat(price), low_stock_threshold: parseInt(low_stock_threshold) },
                { new: true }
            );
            return res.json({ success: true, data: mapProduct(updated) });
        }

        // Create
        const product = await Product.create({
            product_name, category,
            price: parseFloat(price),
            low_stock_threshold: parseInt(low_stock_threshold) || 10
        });
        res.json({ success: true, data: mapProduct(product) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// DELETE /api/products/:id
router.delete('/products/:id', requireAuth, requireAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

function mapProduct(p) {
    return {
        product_id:          p._id,
        product_name:        p.product_name,
        category:            p.category,
        quantity:            p.quantity,
        price:               p.price,
        low_stock_threshold: p.low_stock_threshold,
    };
}

module.exports = router;
