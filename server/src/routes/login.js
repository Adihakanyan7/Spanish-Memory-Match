// login.js
import express from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/tokenUtils.js';

// Import your user-related functions
import { findUserByEmail } from '../models/user.js';

import pool from '../module/db.js'

const router = express.Router();

// Login endpoint
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);
        console.log("login.js -> router.post '/' -> user: ", user);
        if (user && await bcrypt.compare(password, user.hashed_password)) {
            // Utilizing the generateToken function
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;