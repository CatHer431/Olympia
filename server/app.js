const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db.js');
const authRoutes = require('./routes/authRoutes');
const app = express();

// Connect Database
connectDB();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true,
}))

// routes
app.get('/', (req, res) => res.send('Hello world!'));
app.use(authRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));