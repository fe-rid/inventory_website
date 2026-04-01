/**
 * Seed script — run once to create default admin & staff users.
 * Usage: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User     = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/inventory_db';

async function seed() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const users = [
        { username: 'admin', password: 'admin123', role: 'admin' },
        { username: 'staff', password: 'admin123', role: 'staff' },
    ];

    for (const u of users) {
        const exists = await User.findOne({ username: u.username });
        if (!exists) {
            await User.create(u);
            console.log(`✅  Created user: ${u.username} (${u.role})`);
        } else {
            console.log(`⚠️   User already exists: ${u.username}`);
        }
    }

    await mongoose.disconnect();
    console.log('Done.');
}

seed().catch(err => { console.error(err); process.exit(1); });
