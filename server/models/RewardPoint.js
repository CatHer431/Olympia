const mongoose = require('mongoose');
const { isEmail } = require('validator');

// reversation schema in mongodb
const rewardPointSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    email: {
        type: String
    },
    point: {
        type: Number
    }
});

// fire a function after doc saved to db
rewardPointSchema.post('save', function (doc, next) {
    console.log('new reservation was created & saved', doc);
    next();
});

// fire a function before doc saved to db
rewardPointSchema.pre('save', async function (next) {
    next();
})



const RewardPoint = mongoose.model('payments', rewardPointSchema);

module.exports = RewardPoint;