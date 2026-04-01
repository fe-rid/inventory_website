const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name:        { type: String, required: true },
    category:            { type: String, default: '' },
    quantity:            { type: Number, default: 0 },
    price:               { type: Number, required: true },
    low_stock_threshold: { type: Number, default: 10 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
