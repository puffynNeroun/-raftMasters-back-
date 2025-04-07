// src/controllers/categoryController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех категорий
const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Ошибка получения категорий:', error);
        res.status(500).json({ message: 'Ошибка получения категорий' });
    }
};

// Создание новой категории
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCategory = await prisma.category.create({
            data: { name, description },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Ошибка создания категории:', error);
        res.status(500).json({ message: 'Ошибка создания категории' });
    }
};

// Удаление категории по ID
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Категория успешно удалена' });
    } catch (error) {
        console.error('Ошибка удаления категории:', error);
        res.status(500).json({ message: 'Ошибка удаления категории' });
    }
};

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory,
};
