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
            trim: true
        },
        email: {
            type: String,
            required: [true, "Please enter an email"],
            lowercase: true,
            validate: [isEmail, "Please enter a valid email"]
        }
    },
    hotel:{
        _id: {
            type: String
        },
        name: {
            type: String,
            required: [true, "Please enter your hotel name"]
        },
        district: {
            type: String,
            required: [true, "Please enter your hotel name"],
            lowercase: true
        },
        city: {
            type: String,
            required: [true, "Please enter your city name"],
            lowercase: true
        },
        nation:{
            type: String,
            required: [true, "Please enter your hotel name"],
            lowercase: true
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
        discountPercent:{
            type: Number
        },
        rating: {
            type: Number
        },
        hotelID: {
            type: String
        }
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
    },
    totalDate:{
        type: Number
    },
    totalPrice: {
        type: Number
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
    // if(roomId === "64153f680c2abfe66ef599c7")
    //     console.log(result);
    // check room-id
    for(var i=0; i<result.length; i++){
        if(result[i].room._id == roomId){
            return false;
        }
    }
    return true;
}


reservationSchema.statics.updateReservation = async (id, reservation) => {
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