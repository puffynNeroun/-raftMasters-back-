// src/routes/regionRoutes.js
const express = require('express');
const {
    getAllRegions,
    createRegion,
    deleteRegion,
} = require('../controllers/regionController');

const router = express.Router();

router.get('/', getAllRegions);
router.post('/', createRegion);
router.delete('/:id', deleteRegion);

module.exports = router;
