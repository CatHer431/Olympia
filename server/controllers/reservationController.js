const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

// create new reservation
const newReservation = async (req, res) => {
    const { email,  room_id, start_date, end_date} = req.body; // get email,roomid, startDate, endDate in request body

    const user = await User.getByEmail(email); // get user by email
    const room = await Room.getById(room_id); // get room by room-id
    if(room == null || user == null){
        res.status(400).json({result : "User or Room not found!" });
        return;
    }
    const hotel = await Hotel.findByID(room.hotelID);
    try{
        const bookingDate = Date.now();
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        if(!await Reservation.checkValid(room_id, startDate, endDate)){ // check multi booking with [startDate,endDate]
            res.status(400).json({result : "Room Booked!" });
            return;
        }
      
        var days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
        if(room.discountPercent == null) 
            room.discountPercent = 0;
        var totalPrice = days * (room.price - room.discountPercent / 100 * room.price);
        // create reservation if book request is valid
        const reservation = await Reservation.create({
                user: user,
                hotel: hotel, 
                room: room, 
                bookingDate, 
                startDate, 
                endDate,
                totalDate: days,
                totalPrice: totalPrice
        });
        res.status(201).json({ reservation_id: reservation._id }); // create success
    }
    catch (err) {
        console.log(err);
        res.status(400).json({result : "Error!" });
    }
}

// get reservation 
const getReservation = async (req, res) => {
    try{
        const {id} = req.body; // get id in body

        const result = await Reservation.getById(id); // get by id
        if(result){
            res.status(200).json({result: result}); // success
        } else{
            res.status(400).json({result: "Not found" }); // not found
        }
    } catch(err){
        res.status(400).json({result : "Error!" }); // error
    }
}


// cancel reservation = delete reservation
const cancelReservation = async (req, res) => {
    try{
        const {id} = req.body;

        const result = await Reservation.getById(id); // check exists
        if(result){
            await Reservation.deleteById(id); // delete by id
            res.status(200).json({result: "Success!"});
        } else{
            res.status(400).json({result: "Not found" });
        }
    } catch(err){
        res.status(400).json({result : "Error!" });
    }
}


const changeReservation = async (req, res) => {
    try{
        const {reservation_id, room_id, start_date, end_date} = req.body;
        
        const reservation = await Reservation.getById(reservation_id); // get reservation by id, check exists
        
        if(!reservation){
            // if reservation-id is not exists
            res.status(400).json({result: "Not found" });
            return;
        } 

        if(reservation.room._id != room_id){
            // update room info in book request
            const room = await Room.getById(room_id);
            reservation.room = room;
        }
        reservation.bookingDate = Date.now();
        reservation.startDate = new Date(start_date);
        reservation.endDate = new Date(end_date);


        if(!Reservation.checkValid(reservation.room._id, reservation.startDate, reservation.endDate)){
            // check multi booking with [startDate,endDate]
            res.status(400).json({result : "Room Booked!" });
            return;
        }

        // change reservation if book request is valid
        await Reservation.updateReservation(reservation_id, reservation);
        res.status(200).json({result: "Success!"});
    } catch(err){
        res.status(400).json({result : err });
    }
}



module.exports = {newReservation, getReservation, cancelReservation, changeReservation};