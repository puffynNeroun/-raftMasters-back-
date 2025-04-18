// src/routes/materialRoutes.js
const express = require('express');
const {
    getAllMaterials,
    createMaterial,
    deleteMaterial,
} = require('../controllers/materialController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllMaterials);
router.post('/', checkAdmin, createMaterial);
router.delete('/:id', checkAdmin, deleteMaterial);

module.exports = router;
