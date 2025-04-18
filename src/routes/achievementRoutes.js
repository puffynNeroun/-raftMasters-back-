const express = require('express');
const { createAchievement } = require('../controllers/achievementController');
const {checkAdmin} = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/', checkAdmin, createAchievement);

module.exports = router;
