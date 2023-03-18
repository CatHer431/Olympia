const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Room = require('./Room');

// reversation schema in mongodb
const hotelSchema = new mongoose.Schema({
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
    nation: {
        type: String,
        required: [true, "Please enter your nation name"],
        lowercase: true
    },
    description:{
        type: String
    },
    rating: {
        type: Number
    },
    images: [{
        type: String
    }]
});

// fire a function after doc saved to db
hotelSchema.post('save', function (doc, next) {
    console.log('new reservation was created & saved', doc);
    next();
});

// fire a function before doc saved to db
hotelSchema.pre('save', async function (next) {
    next();
})

// // get reservation by id
hotelSchema.statics.getById = async (id) => {
    const hotel = await Hotel.findOne({ _id: id });
    const roomInHotel = await Room.getByHotelID(id);
    const result = {hotel: hotel, rooms: roomInHotel};
    return result;
}

const Hotel = mongoose.model('hotels', hotelSchema);

module.exports = Hotel;