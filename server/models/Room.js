const mongoose = require('mongoose');
const { isEmail } = require('validator');

const roomSchema = new mongoose.Schema({
    id: {
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
    }
});

// static method to login user
roomSchema.statics.getById = async (id) => {
    const room = await Room.findOne({ _id: id });
    return room;
}

const Room = mongoose.model('rooms', roomSchema);

module.exports = Room;