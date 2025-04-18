// src/routes/newsRoutes.js
const express = require('express');
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
} = require('../controllers/newsController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', checkAdmin, createNews);
router.put('/:id', checkAdmin, updateNews);
router.delete('/:id', checkAdmin, deleteNews);

module.exports = router;
