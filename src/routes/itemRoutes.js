const express = require('express');
const {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemImages,
} = require('../controllers/itemController');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.get('/:id/images', getItemImages);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
