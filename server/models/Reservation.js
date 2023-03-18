const mongoose = require('mongoose');
const { isEmail } = require('validator');

// reversation schema in mongodb
const reservationSchema = new mongoose.Schema({
    user: {
        _id: {
            type: String
        },
        firstname: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            required: [true, "Please enter an phone"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"]
        }
    },
    
    room: {
        _id: {
            type: String
        },
        name: {
            type: String
        },
        address: {
            type: String
        },
        price: {
            type: Number
        },
        rating: {
            type: Number
        },
    },

    bookingDate: {
        type: Date,
        default: new Date(+new Date() + 7*24*60*60*1000),
        required: [true, "Please enter an bookingDate"],
    },
    startDate: {
        type: Date,
        required: [true, "Please enter an bookingDate"],

    },
    endDate: {
        type: Date,
        required: [true, "Please enter an bookingDate"],
    }
});

// fire a function after doc saved to db
reservationSchema.post('save', function (doc, next) {
    console.log('new reservation was created & saved', doc);
    next();
});

// fire a function before doc saved to db
reservationSchema.pre('save', async function (next) {
    next();
})

// get reservation by id
reservationSchema.statics.getById = async (id) => {
    const result = await Reservation.findOne({ _id: id });
    return result;
}

// delete reservation by id
reservationSchema.statics.deleteById = async (id) => {
    await Reservation.deleteOne({ _id: id });
}

// check multi booking with same roomID
reservationSchema.statics.checkValid = async (roomId, startDate, endDate) => {

    // check between [startDate,endDate]
    const result = await Reservation.find({ $or: [
        {startDate: {$gte: startDate, $lte: endDate}},
        {endDate: {$gte: startDate, $lte: endDate}}
    ]});

    // check room-id
    for(var i=0; i<result.length; i++){
        if(result[i].room._id == roomId){
            return false;
        }
    }
    return true;
}


reservationSchema.statics.updateReservation = async (id, reservation) => {
    console.log(reservation);
    await Reservation.findByIdAndUpdate({ _id: id }, 
        {
            room: reservation.room, 
            bookingDate: reservation.bookingDate,
            startDate: reservation.startDate, 
            endDate: reservation.endDate
        }
    );
}

const Reservation = mongoose.model('reservations', reservationSchema);

module.exports = Reservation;