const express = require('express');
const {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster,
    getMasterAchievements,
} = require('../controllers/masterController');

const { checkAdmin } = require('../middlewares/authMiddleware'); // подключаем middleware

const router = express.Router();

// Публичные маршруты
router.get('/', getAllMasters);
router.get('/:id', getMasterById);
router.get('/:id/achievements', getMasterAchievements);

// Защищённые маршруты (только для админа)
router.post('/', checkAdmin, createMaster);
router.put('/:id', checkAdmin, updateMaster);
router.delete('/:id', checkAdmin, deleteMaster);

module.exports = router;
