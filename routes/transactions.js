const express     = require('express');
const router      = express.Router();
const Transaction = require('../models/Transaction');
const Product     = require('../models/Product');

function requireAuth(req, res, next) {
    if (!req.session.userId)
        return res.json({ success: false, redirect: 'index.html' });
    next();
}

// GET /api/transactions - all transactions (reports)
router.get('/transactions', requireAuth, async (req, res) => {
    try {
        const txns = await Transaction
            .find()
            .sort({ transaction_date: -1 })
            .populate('product_id', 'product_name')
            .populate('user_id', 'username');

        const data = txns.map(t => ({
            transaction_date: t.transaction_date,
            product_name:     t.product_id ? t.product_id.product_name : 'N/A',
            transaction_type: t.transaction_type,
            quantity:         t.quantity,
            username:         t.user_id ? t.user_id.username : 'N/A',
        }));
        res.json({ success: true, data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// POST /api/transactions - record stock in/out
router.post('/transactions', requireAuth, async (req, res) => {
    try {
        const { product_id, transaction_type, quantity } = req.body;
        const qty = parseInt(quantity);

        if (!product_id || !transaction_type || !qty || qty <= 0)
            return res.json({ success: false, message: 'Invalid input.' });

        const product = await Product.findById(product_id);
        if (!product) return res.json({ success: false, message: 'Product not found.' });

        if (transaction_type === 'out' && product.quantity < qty)
            return res.json({ success: false, message: 'Insufficient stock.' });

        // Adjust quantity
        const delta = transaction_type === 'in' ? qty : -qty;
        product.quantity += delta;
        await product.save();

        await Transaction.create({
            product_id,
            user_id:          req.session.userId,
            transaction_type,
            quantity:         qty,
        });

        res.json({ success: true, message: 'Transaction recorded successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
