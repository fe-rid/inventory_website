const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    product_id:       { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user_id:          { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
    transaction_type: { type: String, enum: ['in', 'out'], required: true },
    quantity:         { type: Number, required: true },
    transaction_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
