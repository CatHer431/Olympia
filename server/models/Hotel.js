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
    description: {
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
    var hotels = id == null ? await Hotel.find({}) : await Hotel.find({ _id: id });
    if (id != null && hotels.length == 0) {
        return null;
    }
    result = []
    for (var i = 0; i < hotels.length; i++) {
        var hotel = hotels[i];
        var roomInHotel = await Room.getByHotelID(hotel._id.toString());
        var json = JSON.parse(JSON.stringify(hotel));
        if (roomInHotel.length > 0) {
            var currentPrice = roomInHotel[0].price - roomInHotel[0].discountPercent / 100 * roomInHotel[0].price;
            var originPrice = roomInHotel[0].price;
            var discountPercent = roomInHotel[0].discountPercent;
            for (var j = 1; j < roomInHotel.length; j++) {
                var price = roomInHotel[j].price - roomInHotel[j].discountPercent / 100 * roomInHotel[j].price;
                if (currentPrice > price) {
                    currentPrice = price;
                    originPrice = roomInHotel[j].price;
                    discountPercent = roomInHotel[j].discountPercent;
                }
            }
            json['min_price'] = { originPrice, currentPrice, discountPercent };
        } else {
            json['min_price'] = null;
        }
        json['rooms'] = roomInHotel;
        result.push(json);
    }

    if (id != null) {
        return result.length == 0 ? null : result[0];
    } else {
        return result;
    }

}

// static method to login user
hotelSchema.statics.findByID = async (id) => {
    const result = await Hotel.findOne({ _id: id });
    return result;
}

// // get reservation by id
hotelSchema.statics.search = async (hotel_id, district, city, nation, startDate, endDate, customerCount) => {
    var hotels = hotel_id == null ? await Hotel.find({}) : await Hotel.find({ _id: hotel_id });
    var arr = [];
    for (var i = 0; i < hotels.length; i++) {
        var hotel = hotels[i];
        if (district != null && hotel.district != null && district.toLowerCase() !== hotel.district.toLowerCase()) {
            continue;
        }
        if (city != null && hotel.city != null && city.toLowerCase() !== hotel.city.toLowerCase()) {
            continue;
        }
        if (nation != null && hotel.nation != null && nation.toLowerCase() !== hotel.nation.toLowerCase()) {
            continue;
        }

        var roomInHotel = await Room.getByHotelIDAndBookingTime(hotel._id.toString(), startDate, endDate, customerCount);
        if (roomInHotel.length > 0) {
            var json = JSON.parse(JSON.stringify(hotel));
            var currentPrice = roomInHotel[0].price - roomInHotel[0].discountPercent / 100 * roomInHotel[0].price;
            var originPrice = roomInHotel[0].price;
            var discountPercent = roomInHotel[0].discountPercent;
            for (var j = 0; j < roomInHotel.length; j++) {
                var price = roomInHotel[j].price - roomInHotel[j].discountPercent / 100 * roomInHotel[j].price;
                if (currentPrice > price) {
                    currentPrice = price;
                    originPrice = roomInHotel[j].price;
                    discountPercent = roomInHotel[j].discountPercent;
                }
            }
            json['min_price'] = { originPrice, currentPrice, discountPercent };
            json['rooms'] = roomInHotel;

            arr.push(json);
        }

    }
    return arr;
}

const Hotel = mongoose.model('hotels', hotelSchema);

module.exports = Hotel;
