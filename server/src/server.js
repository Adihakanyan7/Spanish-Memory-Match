// server.js
import express from 'express';
import register from './routes/register.js';
import login from './routes/login.js';
import memoryGame from './routes/memoryGame.js';
import 'dotenv/config';


const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/register', register);
app.use('/login', login);
app.use('/memory-game', memoryGame);

app.get('/', (req, res) => {
    res.send('Welcome to my server!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}/`);
});
