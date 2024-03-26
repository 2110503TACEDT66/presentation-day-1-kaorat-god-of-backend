const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors')
dotenv.config({ path: './config/config.env' });

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: 'https://swdevprac2-project-kaorat-god-of-backend.vercel.app', // Allow requests from this origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use('/api/v1/massageshops', require('./routes/massageshops'));
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/massagers', require('./routes/massagers'));
app.use('/api/v1/appointments', require('./routes/appointments'));


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on ${process.env.HOST}:${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});