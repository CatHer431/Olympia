const RewardPoint = require('../models/RewardPoint');

// get the reward point
const getRewardPoint = async (req, res) => {
    try {
        const email = req.query.email;

        const result = await RewardPoint.getByEmail(email);
        if (result) {
            res.status(200).json({ result: result.point });
        } else {
            res.status(400).json({ result: "Not found" });
        }
    } catch (err) {
        // console.log("error: ", err);
        res.status(400).json({ result: "Error!" });
    }
}

// redeem the point
const updatePoint = async (req, res) => {
    try {
        const { email, rewardPoint } = req.body;

        const result = await RewardPoint.updateRewardPoint(email, rewardPoint);
        if (result) {
            res.status(200).json({ result: result.point });
        } else {
            res.status(400).json({ result: "Not found" });
        }
    } catch (err) {
        console.log("error: ", err);
        res.status(400).json({ result: "Error!" });
    }
}

module.exports = { getRewardPoint, updatePoint };
