require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const cors         = require('cors');
const session      = require('express-session');
const bodyParser   = require('body-parser');
const path         = require('path');

const authRoutes         = require('./routes/auth');
const dashboardRoutes    = require('./routes/dashboard');
const productRoutes      = require('./routes/products');
const transactionRoutes  = require('./routes/transactions');

const app  = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory_db';

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret:            process.env.SESSION_SECRET || 'inv_secret_key_2026',
    resave:            false,
    saveUninitialized: false,
    cookie:            { secure: false, maxAge: 1000 * 60 * 60 * 8 }, // 8 hours
}));

// ── Serve static frontend files ───────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));

// ── API Routes ────────────────────────────────────────────────────────────────
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', productRoutes);
app.use('/api', transactionRoutes);

// ── Connect & Start ───────────────────────────────────────────────────────────
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('✅  MongoDB connected →', MONGO_URI);
        app.listen(PORT, () => {
            console.log(`🚀  Server running at http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌  MongoDB connection error:', err.message);
        process.exit(1);
    });
