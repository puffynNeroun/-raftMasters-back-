// src/controllers/materialController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Получение всех материалов
const getAllMaterials = async (req, res) => {
    try {
        const materials = await prisma.material.findMany();
        res.status(200).json(materials);
    } catch (error) {
        console.error('Ошибка получения материалов:', error);
        res.status(500).json({ message: 'Ошибка получения материалов' });
    }
};

// Создание нового материала
const createMaterial = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newMaterial = await prisma.material.create({
            data: { name, description },
        });
        res.status(201).json(newMaterial);
    } catch (error) {
        console.error('Ошибка создания материала:', error);
        res.status(500).json({ message: 'Ошибка создания материала' });
    }
};

// Удаление материала по ID
const deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.material.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Материал успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления материала:', error);
        res.status(500).json({ message: 'Ошибка удаления материала' });
    }
};

module.exports = {
    getAllMaterials,
    createMaterial,
    deleteMaterial,
};
