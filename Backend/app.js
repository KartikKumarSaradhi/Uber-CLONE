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
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add all allowed origins here
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Block the request
        }
    },
    credentials: true, // Allow credentials (cookies, authorization headers)
    allowedHeaders: ['Authorization', 'Content-Type'], // Allow specific headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
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