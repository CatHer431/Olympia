const express = require('express');
const connectDB = require('./db.js');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Connect Database
connectDB();

// routes
app.get('/', (req, res) => res.send('Hello world!'));
app.use(authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));