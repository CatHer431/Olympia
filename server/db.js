require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.DATABASE_URL;
console.log(db);

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
        });
        console.log('MongoDB is connected ...');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;