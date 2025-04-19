// src/routes/newsRoutes.js
const express = require('express');
const {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
} = require('../controllers/newsController');
const { checkAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware'); // ⬅ добавь импорт

const router = express.Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);

// ⬇ добавь upload.single('image') перед контроллером
router.post('/', checkAdmin, upload.single('image'), createNews);

router.put('/:id', checkAdmin, updateNews);
router.delete('/:id', checkAdmin, deleteNews);

module.exports = router;
