const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db.js');
const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const roomRoutes = require('./routes/roomRoutes');
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
app.use(reservationRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));