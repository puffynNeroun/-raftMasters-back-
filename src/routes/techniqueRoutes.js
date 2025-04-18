// src/routes/techniqueRoutes.js
const express = require('express');
const {
    getAllTechniques,
    createTechnique,
    deleteTechnique,
} = require('../controllers/techniqueController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllTechniques);
router.post('/', checkAdmin, createTechnique);
router.delete('/:id', checkAdmin, deleteTechnique);

module.exports = router;
