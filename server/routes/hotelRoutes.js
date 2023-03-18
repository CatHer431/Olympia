const express = require('express');
const {getHotel } = require('../controllers/hotelController');

const router = express.Router();

router.get('/hotel/:id', getHotel);
module.exports = router;