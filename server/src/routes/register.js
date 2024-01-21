// register.js 
import express from 'express';
import bcrypt from 'bcrypt';

import { createUser, findUserByEmail } from '../models/user.js';
import { generateToken } from '../utils/tokenUtils.js';

import pool from '../module/db.js'


const router = express.Router();

// Registration endpoint
router.post('/', async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;
        const existingUser  = await findUserByEmail(email);
        if (existingUser) {
            console.log("register.js -> the eamil is already exists.")
            return res.status(409).json({ message: 'Email already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
            const newUser = await createUser({ fName, lName, email, hashedPassword });
            const token = generateToken(newUser);
            res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;