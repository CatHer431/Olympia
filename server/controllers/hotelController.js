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
        console.log(err);
        res.status(400).json({result : "Error!" }); // error
    }
}

const searchHotel = async (req, res) => {
    if(req.query.start_date == null || req.query.end_date == null){
        res.status(400).json({result: "Startdate, endDate must not null" }); // not found
        return;
    }
    const startDate = new Date(req.query.start_date);
    const endDate = new Date(req.query.end_date);
    const result = await Hotel.search(
        req.params['id'],
        req.query.district,
        req.query.city,
        req.query.nation,
        startDate,
        endDate,
        req.query.max_person
    ); // get by id
    if(req.query.sort != null){
        if(req.query.sort == 'asc'){    
            result.sort(function(a, b){return a['rating'] - b['rating']})
        } else{
            result.sort(function(a, b){return b['rating'] - a['rating']})
        }
    }
    res.status(200).json({result: result});
}


module.exports = {getHotel, searchHotel};