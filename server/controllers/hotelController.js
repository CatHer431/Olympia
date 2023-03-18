const Hotel = require('../models/Hotel');

// get reservation 
const getHotel = async (req, res) => {
    var hotelID = req.params['id'];
    try{
        const result = await Hotel.getById(hotelID); // get by id
        if(result){
            res.status(200).json({result: result}); // success
        } else{
            res.status(400).json({result: "Not found" }); // not found
        }
    } catch(err){
        res.status(400).json({result : "Error!" }); // error
    }
}

module.exports = {getHotel };