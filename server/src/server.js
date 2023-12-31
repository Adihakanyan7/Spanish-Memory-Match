import express from 'express';
import pg from 'pg';
const { Pool } = pg;

const app = express();
const port = process.env.PORT || 3001;

const pool = new Pool({
    user: 'postgres',
  host: 'localhost',
  database: 'Learning_Spanish',
  password: '....',
  port: 5432,
});

app.get('/', async (req, res) => {
  try{
    const {rows} = await pool.query('SELECT NOW()');
    res.send(`Database connected! Current time: ${rows[0].now}`);
  } catch(err){
    res.status(500).send('Database connection error');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
