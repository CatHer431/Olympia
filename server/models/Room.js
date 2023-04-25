const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Reservation = require('./Reservation');

const roomSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    rating: {
        type: Number
    },
    maxPerson: {
        type: Number
    },
    bedAmount: {
        type: Number
    },
    discountPercent: {
        type: Number,
        default: 0
    },
    images: [{
        type: String
    }],
    hotelID: {
        type: String
    }
});

// static method to login user
roomSchema.statics.getByHotelID = async (hotel_id) => {
    const room = await Room.find({ hotelID: hotel_id });
    return room;
}

// static method to login user
roomSchema.statics.getById = async (id) => {
    const room = await Room.findOne({ _id: id });
    return room;
}

// static method to login user
roomSchema.statics.getByHotelIDAndBookingTime = async (hotel_id, startDate, endDate, maxPerson) => {
    const rooms = await Room.getByHotelID(hotel_id);
    result = []
    for (var i = 0; i < rooms.length; i++) {
        if (maxPerson != null && rooms[i].maxPerson < maxPerson) {
            continue;
        }
        if (await Reservation.checkValid(rooms[i]._id.toString(), startDate, endDate)) {
            result.push(rooms[i]);
        }
    }
    return result;
}

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;
