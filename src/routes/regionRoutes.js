// src/routes/regionRoutes.js
const express = require('express');
const {
    getAllRegions,
    createRegion,
    deleteRegion,
} = require('../controllers/regionController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllRegions);
router.post('/', checkAdmin, createRegion);
router.delete('/:id', checkAdmin, deleteRegion);

module.exports = router;
