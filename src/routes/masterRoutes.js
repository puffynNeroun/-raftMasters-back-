const express = require('express')
const upload = require('../middlewares/uploadMiddleware')
const {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster,
    getMasterAchievements,
} = require('../controllers/masterController')
const { checkAdmin } = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/', getAllMasters)
router.get('/:id', getMasterById)
router.get('/:id/achievements', getMasterAchievements)

// Загрузка фото → поле "photo" в форме
router.post('/', checkAdmin, upload.single('photo'), createMaster)
router.put('/:id', checkAdmin, upload.single('photo'), updateMaster)
router.delete('/:id', checkAdmin, deleteMaster)

module.exports = router
