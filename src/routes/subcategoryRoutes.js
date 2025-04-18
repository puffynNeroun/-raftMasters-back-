// src/routes/subcategoryRoutes.js
const express = require('express');
const {
    getAllSubcategories,
    createSubcategory,
    deleteSubcategory,
} = require('../controllers/subcategoryController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllSubcategories);
router.post('/', checkAdmin, createSubcategory);
router.delete('/:id', checkAdmin, deleteSubcategory);

module.exports = router;
