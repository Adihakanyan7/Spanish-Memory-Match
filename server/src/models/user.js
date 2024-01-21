import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const { Pool } = pg;

const app = express();
app.use(cors()); // Enable CORS for all routes

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


/**
 * Creates a new user in the database.
 * @param {Object} user - User object containing firstName, lastName, email, and hashedPassword.
 * @returns {Object} The created user's id.
 * @throws {Error} Throws an error if user creation fails.
 */
const createUser = async (user) => {
  const { fName, lName, email, hashedPassword } = user;
  try {
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, hashed_password) VALUES ($1, $2, $3, $4) RETURNING id',
      [fName, lName, email, hashedPassword]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database operation failed:', error);
    if (error.code === '23505') {
      throw new Error('User with this email already exists.');
    } else {
      throw new Error('Error creating user.');
    }
  }
};

/**
 * Finds a user by their email.
 * @param {string} email - The email of the user to find.
 * @returns {Object} The found user object.
 * @throws {Error} Throws an error if the user is not found or if there is a database error.
 */
const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (result.rows.length === 0) {
      throw new Error('User not found.');
    }
    console.log("user.js -> use email: ",result.rows[0])
    return result.rows[0];
  } catch (error) {
    throw new Error('Error finding user.');
  }
};

export { createUser, findUserByEmail };