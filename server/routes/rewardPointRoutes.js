const express = require('express');
const { getRewardPoint, updatePoint } = require('../controllers/rewardPointController');

const router = express.Router();

// get RewardPoint
router.get('/rewardPoint', getRewardPoint);
router.put('/updatePoint', updatePoint);

module.exports = router;
