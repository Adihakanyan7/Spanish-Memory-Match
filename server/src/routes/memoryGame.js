import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const { Pool } = pg;

const app = express();
app.use(cors()); // Enable CORS for all routes

const router = express.Router();


const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


router.get('/', async (req, res) => {
  try{
    const {rows} = await pool.query('SELECT NOW()');
    res.send(`Database connected! Current time: ${rows[0].now}`);
  } catch(err){
    res.status(500).send('Database connection error');
  }
});

router.get('/dict', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM dictionaryWords');
    const data = result.rows;
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving categories');
  }
});

router.get('/categories', async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT category FROM dictionaryWords');
    const categories = result.rows.map(row => row.category);
    res.json(categories);
  } catch (err) {
    res.status(500).send('Error retrieving categories');
  }
});

router.post('/words', express.json(), async (req, res) => {
  try {
    const { spanish, hebrew, category } = req.body;
    const result = await pool.query('INSERT INTO dictionarywords (spanish, hebrew, category) VALUES ($1, $2, $3)', [spanish, hebrew, category]);
    res.status(201).send('Word pair added successfully');
  } catch (err) {
    res.status(500).send('Error adding word pair');
  }
});

router.get('/words/:category', async(req, res) => {
  try{
    const category = req.params.category;
    const result = await pool.query('SELECT spanish, hebrew FROM dictionarywords WHERE category = $1', [category]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving words');
  }
})

router.put('/words/:id', express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const { spanish, hebrew, category } = req.body;
    const result = await pool.query('UPDATE dictionarywords SET spanish = $1, hebrew = $2, category = $3 WHERE id = $4', [spanish, hebrew, category, id]);
    if (result.rowCount === 0) {
      res.status(404).send('Word pair not found');
    } else {
      res.send('Word pair updated successfully');
    }
  } catch (err) {
    res.status(500).send('Error updating word pair');
  }
});

router.delete('/words/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dictionarywords WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Word pair not found');
    } else {
      res.send('Word pair deleted successfully');
    }
  } catch (err) {
    res.status(500).send('Error deleting word pair');
  }
});



export default router;