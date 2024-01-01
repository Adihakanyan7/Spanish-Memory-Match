import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});


app.get('/', async (req, res) => {
  try{
    const {rows} = await pool.query('SELECT NOW()');
    res.send(`Database connected! Current time: ${rows[0].now}`);
  } catch(err){
    res.status(500).send('Database connection error');
  }
});

app.post('/words', express.json(), async (req, res) => {
  try {
    const { spanish, hebrew, category } = req.body;
    const result = await pool.query('INSERT INTO dictionaryWords (spanish, hebrew, category) VALUES ($1, $2, $3)', [spanish, hebrew, category]);
    res.status(201).send('Word pair added successfully');
  } catch (err) {
    res.status(500).send('Error adding word pair');
  }
});

app.get('/words/:category', async(req, res) => {
  try{
    const category = req.params.category;
    const result = await pool.query('SELECT spanish, hebrew FROM dictionaryWords WHERE category = $1', [category]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error retrieving words');
  }
})

app.put('/words/:id', express.json(), async (req, res) => {
  try {
    const { id } = req.params;
    const { spanish, hebrew, category } = req.body;
    const result = await pool.query('UPDATE dictionaryWords SET spanish = $1, hebrew = $2, category = $3 WHERE id = $4', [spanish, hebrew, category, id]);
    if (result.rowCount === 0) {
      res.status(404).send('Word pair not found');
    } else {
      res.send('Word pair updated successfully');
    }
  } catch (err) {
    res.status(500).send('Error updating word pair');
  }
});

app.delete('/words/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dictionaryWords WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send('Word pair not found');
    } else {
      res.send('Word pair deleted successfully');
    }
  } catch (err) {
    res.status(500).send('Error deleting word pair');
  }
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
