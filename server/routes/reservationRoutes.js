const express = require('express');
const { newReservation, getReservation, cancelReservation, changeReservation, getReservationByEmail, getUserReservation } = require('../controllers/reservationController');

const router = express.Router();

// method get
router.get('/reservation', getReservation);

// method post
router.post('/reservation', newReservation);

// method delete
router.delete('/reservation', cancelReservation);

// method put
router.put('/reservation', changeReservation);

router.get('/my-reservation', getReservationByEmail);

router.get('/paid-reservation', getUserReservation);

module.exports = router;
