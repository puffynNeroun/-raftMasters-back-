const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllItems = async (req, res) => {
    try {
        const { category, material, master } = req.query;

        const items = await prisma.item.findMany({
            where: {
                AND: [
                    category ? { category: { name: category } } : {},
                    material ? { material: { name: material } } : {},
                    master ? { master: { fullName: master } } : {}
                ]
            },
            include: {
                master: true,
                category: true,
                subcategory: true,
                material: true,
                technique: true,
                images: true,
            },
        });

        res.status(200).json(items);
    } catch (error) {
        console.error('Ошибка получения изделий:', error);
        res.status(500).json({ message: 'Ошибка получения изделий' });
    }
};

const getItemById = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.item.findUnique({
            where: { id: parseInt(id) },
            include: {
                master: true,
                category: true,
                subcategory: true,
                material: true,
                technique: true,
                images: true,
            },
        });

        if (!item) {
            return res.status(404).json({ message: 'Изделие не найдено' });
        }

        res.status(200).json(item);
    } catch (error) {
        console.error('Ошибка получения изделия:', error);
        res.status(500).json({ message: 'Ошибка получения изделия' });
    }
};

const createItem = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            masterId,
            categoryId,
            subcategoryId,
            materialId,
            techniqueId,
            mainImage,
        } = req.body;

        const newItem = await prisma.item.create({
            data: {
                name,
                description,
                price,
                masterId,
                categoryId,
                subcategoryId,
                materialId,
                techniqueId,
                mainImage,
            },
        });

        res.status(201).json(newItem);
    } catch (error) {
        console.error('Ошибка создания изделия:', error);
        res.status(500).json({ message: 'Ошибка создания изделия' });
    }
};

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            price,
            masterId,
            categoryId,
            subcategoryId,
            materialId,
            techniqueId,
            mainImage,
        } = req.body;

        const updatedItem = await prisma.item.update({
            where: { id: parseInt(id) },
            data: {
                name,
                description,
                price,
                masterId,
                categoryId,
                subcategoryId,
                materialId,
                techniqueId,
                mainImage,
            },
        });

        res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Ошибка обновления изделия:', error);
        res.status(500).json({ message: 'Ошибка обновления изделия' });
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.item.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Изделие успешно удалено' });
    } catch (error) {
        console.error('Ошибка удаления изделия:', error);
        res.status(500).json({ message: 'Ошибка удаления изделия' });
    }
};

const getItemImages = async (req, res) => {
    try {
        const { id } = req.params;
        const images = await prisma.itemImage.findMany({
            where: { itemId: parseInt(id) },
        });

        res.status(200).json(images);
    } catch (error) {
        console.error('Ошибка получения изображений изделия:', error);
        res.status(500).json({ message: 'Ошибка получения изображений' });
    }
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getItemImages,
};
