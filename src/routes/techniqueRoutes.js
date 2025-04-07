// src/routes/techniqueRoutes.js
const express = require('express');
const {
    getAllTechniques,
    createTechnique,
    deleteTechnique,
} = require('../controllers/techniqueController');

const router = express.Router();

router.get('/', getAllTechniques);
router.post('/', createTechnique);
router.delete('/:id', deleteTechnique);

module.exports = router;
