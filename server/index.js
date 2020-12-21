import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// initialize app
const app = express();
dotenv.config();

// connect to db --->        if you want to connect to cloud server: edit "CONNECTION_URL" in -> .env file
const DB_NAME = 'testDB'; // if you want to use local server: edit this "DB_NAME" (and remove the "CONNECTION_URL" from -> .env file)
const CONNECTION_URL = process.env.CONNECTION_URL || `mongodb://localhost:27017/${DB_NAME}`;
const PORT = process.env.PORT || 8080; // 8080 === development port
const DEPRECATED_FIX = { useNewUrlParser: true, useUnifiedTopology: true }; // change this with (possible) warnings on first connection

mongoose
  .connect(CONNECTION_URL, DEPRECATED_FIX)
  .then(() => console.log('✅ MongoDB connected'))
  .then(() => app.listen(PORT, () => console.log(`✅ Listening on port: ${PORT}`)))
  .catch((error) => console.log(`❌ ${error}`));

mongoose.connection.on('error', (err) => console.log(`❌ MongoDB: ${err}`));

// middlewares
app.use(express.json()); // body parser
app.use(cors()); // enables requests

// routes
app.get('/', (req, res) => res.send('Hello World - Express.js'));
// app.use('/', IMPORTED_ROUTES);