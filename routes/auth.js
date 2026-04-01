const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// POST /api/login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.json({ success: false, message: 'Username and password are required.' });

        const user = await User.findOne({ username });
        if (!user)
            return res.json({ success: false, message: 'Invalid username or password.' });

        const match = await user.comparePassword(password);
        if (!match)
            return res.json({ success: false, message: 'Invalid username or password.' });

        req.session.userId   = user._id;
        req.session.username = user.username;
        req.session.role     = user.role;

        res.json({ success: true, redirect: 'dashboard.html' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// GET /api/logout
router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

module.exports = router;
