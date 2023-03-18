const mongoose = require('mongoose');
const { isEmail } = require('validator');

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
    maxPerson:{
        type: Number
    },
    bedAmount: {
        type: Number
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

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;