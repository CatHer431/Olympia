const express = require('express');
const connectDB = require('./db.js');
const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => res.send('Hello world!'));
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));