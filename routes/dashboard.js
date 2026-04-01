const express     = require('express');
const router      = express.Router();
const Product     = require('../models/Product');
const Transaction = require('../models/Transaction');

// Middleware: require login
function requireAuth(req, res, next) {
    if (!req.session.userId)
        return res.json({ success: false, redirect: 'index.html' });
    next();
}

// GET /api/dashboard
router.get('/dashboard', requireAuth, async (req, res) => {
    try {
        const total_products = await Product.countDocuments();
        const low_stock_count = await Product.countDocuments({
            $expr: { $lte: ['$quantity', '$low_stock_threshold'] }
        });

        const recent_transactions = await Transaction
            .find()
            .sort({ transaction_date: -1 })
            .limit(10)
            .populate('product_id', 'product_name')
            .populate('user_id', 'username');

        const formatted = recent_transactions.map(t => ({
            transaction_date: t.transaction_date,
            product_name:     t.product_id ? t.product_id.product_name : 'N/A',
            transaction_type: t.transaction_type,
            quantity:         t.quantity,
        }));

        res.json({
            success: true,
            user: { username: req.session.username, role: req.session.role },
            metrics: { total_products, low_stock_count },
            recent_transactions: formatted,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

module.exports = router;
