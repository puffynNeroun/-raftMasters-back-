// src/routes/categoryRoutes.js
const express = require('express');
const {
    getAllCategories,
    createCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', checkAdmin, createCategory);
router.delete('/:id', checkAdmin, deleteCategory);

module.exports = router;
