// src/routes/eventsRoutes.js
const express = require('express');
const {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventsController');
const {checkAdmin} = require("../middlewares/authMiddleware");

const router = express.Router();

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/', checkAdmin, createEvent);
router.put('/:id', checkAdmin,  updateEvent);
router.delete('/:id', checkAdmin, deleteEvent);

module.exports = router;
