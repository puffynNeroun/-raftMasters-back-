// src/routes/subcategoryRoutes.js
const express = require('express');
const {
    getAllSubcategories,
    createSubcategory,
    deleteSubcategory,
} = require('../controllers/subcategoryController');

const router = express.Router();

router.get('/', getAllSubcategories);
router.post('/', createSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;
