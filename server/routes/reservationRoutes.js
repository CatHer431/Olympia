const express = require('express');
const { newReservation, getReservation, cancelReservation, changeReservation} = require('../controllers/reservationController');

const router = express.Router();

router.get('/reservation', getReservation);

router.post('/reservation', newReservation);

router.delete('/reservation', cancelReservation);

router.put('/reservation', changeReservation);

module.exports = router;