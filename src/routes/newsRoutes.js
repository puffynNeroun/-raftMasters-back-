// src/routes/newsRoutes.js
const express = require('express');
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
} = require('../controllers/newsController');

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.post('/', createNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

module.exports = router;
