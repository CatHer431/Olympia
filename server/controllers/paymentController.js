const Payment = require('../models/Payment');
const RewardPoint = require('../models/RewardPoint');
const User = require('../models/User');

// get reservation 
const payReservation = async (req, res) => {
    try{
        const reservationId = req.query.reservation_id;
        const payment = await Payment.getByReservationId(reservationId);
       
        if(payment){
            payment.status = 1;
            await Payment.updatePayment(reservationId, payment);
            const rewardPoint = await RewardPoint.getByEmail(payment.email);
            if(rewardPoint){
                rewardPoint.point += 100;
                await RewardPoint.updateRewardPoint(payment.email, rewardPoint);
            } else {
                const user = await User.getByEmail(payment.email);
                await RewardPoint.create({user_id: user._id, email: payment.email, point: 100});
            }
            res.status(200).json(payment);
        } else{
            res.status(400).json({result: "Not found" });
        }
    } catch(err){
        res.status(400).json({result : "Error!" });
    }
}

module.exports = {payReservation};