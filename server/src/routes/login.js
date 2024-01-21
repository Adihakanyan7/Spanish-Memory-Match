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
        if (await bcrypt.compare(password, user.hashed_password)) {
            // Utilizing the generateToken function
            const token = generateToken(user);
            res.json({ token });
        } else {
            res.status(401).json({ message: 'This is not the user password' });
        }
    } catch (error) {
        res.status(401).json({ message: 'There is not user with this email'  });
    }
});


export default router;