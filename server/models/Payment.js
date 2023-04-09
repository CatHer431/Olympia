const mongoose = require('mongoose');
const { isEmail } = require('validator');

// reversation schema in mongodb
const paymentSchema = new mongoose.Schema({
    reservation_id: {
        type: String
    },
    email: {
        type: String
    },
    status: {
        type: Number
    }
});

// fire a function after doc saved to db
paymentSchema.post('save', function (doc, next) {
    console.log('new reservation was created & saved', doc);
    next();
});

// fire a function before doc saved to db
paymentSchema.pre('save', async function (next) {
    next();
})

// delete reservation by id
paymentSchema.statics.deleteByReservationId = async (id) => {
    await Payment.deleteOne({ reservation_id: id });
}

// get reservation by id
paymentSchema.statics.getByReservationId = async (id) => {
    const result = await Payment.findOne({ reservation_id: id });
    return result;
}

paymentSchema.statics.updatePayment = async (id, payment) => {
    await Payment.findOneAndUpdate({ reservation_id: id }, 
        {
            reservation_id: id, 
            email: payment.email,
            status: payment.status
        }
    );
}

const Payment = mongoose.model('payments', paymentSchema);

module.exports = Payment;