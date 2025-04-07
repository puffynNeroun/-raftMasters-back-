// src/controllers/subcategoryController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех подкатегорий
const getAllSubcategories = async (req, res) => {
    try {
        const subcategories = await prisma.subcategory.findMany();
        res.status(200).json(subcategories);
    } catch (error) {
        console.error('Ошибка получения подкатегорий:', error);
        res.status(500).json({ message: 'Ошибка получения подкатегорий' });
    }
};

// Создание новой подкатегории
const createSubcategory = async (req, res) => {
    try {
        const { name, description, categoryId } = req.body;
        const newSubcategory = await prisma.subcategory.create({
            data: { name, description, categoryId },
        });
        res.status(201).json(newSubcategory);
    } catch (error) {
        console.error('Ошибка создания подкатегории:', error);
        res.status(500).json({ message: 'Ошибка создания подкатегории' });
    }
};

// Удаление подкатегории по ID
const deleteSubcategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.subcategory.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Подкатегория успешно удалена' });
    } catch (error) {
        console.error('Ошибка удаления подкатегории:', error);
        res.status(500).json({ message: 'Ошибка удаления подкатегории' });
    }
};

module.exports = {
    getAllSubcategories,
    createSubcategory,
    deleteSubcategory,
};
