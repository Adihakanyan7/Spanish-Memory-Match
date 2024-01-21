// utils/tokenUtils.js
import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for a user.
 * @param {Object} user - The user object (typically containing user's ID and email).
 * @returns {string} - A JWT token.
 */
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }  // Token expires in 24 hours
    );
};
