// src/controllers/regionController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех регионов
const getAllRegions = async (req, res) => {
    try {
        const regions = await prisma.region.findMany();
        res.status(200).json(regions);
    } catch (error) {
        console.error('Ошибка получения регионов:', error);
        res.status(500).json({ message: 'Ошибка получения регионов' });
    }
};

// Создание нового региона
const createRegion = async (req, res) => {
    try {
        const { name } = req.body;
        const newRegion = await prisma.region.create({
            data: { name },
        });
        res.status(201).json(newRegion);
    } catch (error) {
        console.error('Ошибка создания региона:', error);
        res.status(500).json({ message: 'Ошибка создания региона' });
    }
};

// Удаление региона по ID
const deleteRegion = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.region.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Регион успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления региона:', error);
        res.status(500).json({ message: 'Ошибка удаления региона' });
    }
};

module.exports = {
    getAllRegions,
    createRegion,
    deleteRegion,
};
