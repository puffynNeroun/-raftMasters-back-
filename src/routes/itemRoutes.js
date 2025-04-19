const express = require('express');
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemImages,
} = require('../controllers/itemController');
const {checkAdmin} = require("../middlewares/authMiddleware");
const upload = require('../middlewares/uploadMiddleware');


const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/:id/images', getItemImages);
router.post('/', checkAdmin, upload.single('mainImage'), createItem);
router.put('/:id', checkAdmin, upload.single('mainImage'), updateItem);
router.delete('/:id', checkAdmin, deleteItem);

module.exports = router;
