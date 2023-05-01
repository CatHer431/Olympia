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

// get reservation by id
rewardPointSchema.statics.getByEmail = async (email) => {
    const result = await RewardPoint.findOne({ email: email });
    return result;
}

rewardPointSchema.statics.updateRewardPoint = async (email, rewardPoint) => {
    console.log("email in RewardPoint model: ", email);
    console.log("reward Point in RewardPoint model: ", rewardPoint);
    const result = await RewardPoint.findOneAndUpdate({ email: email },
        {
            user_id: rewardPoint.user_id,
            email: email,
            point: rewardPoint
        },
        { new: true }
    );
    return result;
}

const RewardPoint = mongoose.model('rewardPoints', rewardPointSchema);

module.exports = RewardPoint;
