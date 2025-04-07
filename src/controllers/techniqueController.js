// src/controllers/techniqueController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех техник
const getAllTechniques = async (req, res) => {
    try {
        const techniques = await prisma.technique.findMany();
        res.status(200).json(techniques);
    } catch (error) {
        console.error('Ошибка получения техник:', error);
        res.status(500).json({ message: 'Ошибка получения техник' });
    }
};

// Создание новой техники
const createTechnique = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newTechnique = await prisma.technique.create({
            data: { name, description },
        });
        res.status(201).json(newTechnique);
    } catch (error) {
        console.error('Ошибка создания техники:', error);
        res.status(500).json({ message: 'Ошибка создания техники' });
    }
};

// Удаление техники по ID
const deleteTechnique = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.technique.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Техника успешно удалена' });
    } catch (error) {
        console.error('Ошибка удаления техники:', error);
        res.status(500).json({ message: 'Ошибка удаления техники' });
    }
};

module.exports = {
    getAllTechniques,
    createTechnique,
    deleteTechnique,
};
