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

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/:id/images', getItemImages);
router.post('/', checkAdmin, createItem);
router.put('/:id', checkAdmin, updateItem);
router.delete('/:id', checkAdmin, deleteItem);

module.exports = router;
