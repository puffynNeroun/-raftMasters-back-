const express = require('express');
const {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster,
    getMasterAchievements,
} = require('../controllers/masterController');

const router = express.Router();

router.get('/', getAllMasters);
router.get('/:id', getMasterById);
router.get('/:id/achievements', getMasterAchievements);
router.post('/', createMaster);
router.put('/:id', updateMaster);
router.delete('/:id', deleteMaster);

module.exports = router;
