// src/routes/materialRoutes.js
const express = require('express');
const {
    getAllMaterials,
    createMaterial,
    deleteMaterial,
} = require('../controllers/materialController');

const router = express.Router();

router.get('/', getAllMaterials);
router.post('/', createMaterial);
router.delete('/:id', deleteMaterial);

module.exports = router;
