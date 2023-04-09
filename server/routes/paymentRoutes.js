const express = require('express');
const { payReservation } = require('../controllers/paymentController');

const router = express.Router();

router.post('/payment', payReservation);


module.exports = router;