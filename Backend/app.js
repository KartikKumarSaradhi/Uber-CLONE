const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./Routes/user.routes');
const captainRoutes = require('./Routes/captain.routes');


connectToDb();


app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);


module.exports = app;