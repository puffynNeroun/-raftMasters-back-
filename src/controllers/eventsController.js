// src/controllers/eventsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех событий
const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany();
        res.status(200).json(events);
    } catch (error) {
        console.error('Ошибка получения событий:', error);
        res.status(500).json({ message: 'Ошибка получения событий' });
    }
};

// Получение события по ID
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id: parseInt(id) },
        });

        if (!event) {
            return res.status(404).json({ message: 'Событие не найдено' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Ошибка получения события:', error);
        res.status(500).json({ message: 'Ошибка получения события' });
    }
};

// Создание события
const createEvent = async (req, res) => {
    try {
        const { title, description, eventDate, location, image } = req.body;
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                eventDate: new Date(eventDate),
                location,
                image,
            },
        });

        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Ошибка создания события:', error);
        res.status(500).json({ message: 'Ошибка создания события' });
    }
};

// Обновление события
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, eventDate, location, image } = req.body;

        const updatedEvent = await prisma.event.update({
            where: { id: parseInt(id) },
            data: {
                title,
                description,
                eventDate: new Date(eventDate),
                location,
                image,
            },
        });

        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Ошибка обновления события:', error);
        res.status(500).json({ message: 'Ошибка обновления события' });
    }
};

// Удаление события
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.event.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Событие успешно удалено' });
    } catch (error) {
        console.error('Ошибка удаления события:', error);
        res.status(500).json({ message: 'Ошибка удаления события' });
    }
};

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
};
