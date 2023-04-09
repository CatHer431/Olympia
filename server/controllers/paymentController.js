const Payment = require('../models/Payment');

// get reservation 
const payReservation = async (req, res) => {
    try{
        const reservationId = req.query.reservation_id;
        const payment = await Payment.getByReservationId(reservationId);

        console.log(payment);
        if(payment){
            payment.status = 1;
            await Payment.updatePayment(reservationId, payment);
            res.status(200).json(payment);
        } else{
            res.status(400).json({result: "Not found" });
        }
    } catch(err){
        res.status(400).json({result : "Error!" });
    }
}

module.exports = {payReservation};