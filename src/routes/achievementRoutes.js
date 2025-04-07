const express = require('express');
const { createAchievement } = require('../controllers/achievementController');
const router = express.Router();

router.post('/', createAchievement);

module.exports = router;
