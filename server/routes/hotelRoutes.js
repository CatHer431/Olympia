const express = require('express');
const {getHotel, searchHotel} = require('../controllers/hotelController');

const router = express.Router();

router.get('/hotel/:id', getHotel);

router.get('/hotels', getHotel);
router.get('/search/hotel', searchHotel);
router.get('/search/hotel/:id', searchHotel);
module.exports = router;