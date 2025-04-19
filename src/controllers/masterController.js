const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllMasters = async (req, res) => {
    try {
        const { craft, region } = req.query;

        const masters = await prisma.master.findMany({
            where: {
                AND: [
                    craft ? { category: { name: craft } } : {},
                    region ? { region: { name: region } } : {}
                ]
            },
            include: {
                category: true,
                region: true,
                achievements: true,
                items: true,
            },
        });

        res.status(200).json(masters);
    } catch (error) {
        console.error('Ошибка получения мастеров:', error);
        res.status(500).json({ message: 'Ошибка получения мастеров' });
    }
};

const getMasterById = async (req, res) => {
    try {
        const { id } = req.params;

        const master = await prisma.master.findUnique({
            where: { id: parseInt(id) },
            include: {
                category: true,
                region: true,
                achievements: true,
                items: {
                    include: {
                        category: true,
                        subcategory: true,
                        material: true,
                        technique: true,
                        images: true,
                    },
                },
            },
        });

        if (!master) {
            return res.status(404).json({ message: 'Мастер не найден' });
        }

        res.status(200).json(master);
    } catch (error) {
        console.error('Ошибка получения мастера:', error);
        res.status(500).json({ message: 'Ошибка получения мастера' });
    }
};

const createMaster = async (req, res) => {
    try {
        const {
            fullName,
            categoryId,
            regionId,
            shortDescription,
            biography,
            contactPhone,
            contactEmail,
        } = req.body;

        // Обработка массива socialLinks
        let socialLinks = req.body.socialLinks;
        if (Array.isArray(socialLinks)) {
            socialLinks = socialLinks.join(',');
        }

        // Обработка фото
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        const newMaster = await prisma.master.create({
            data: {
                fullName,
                categoryId: +categoryId,
                regionId: +regionId,
                shortDescription,
                biography,
                contactPhone,
                contactEmail,
                socialLinks,
                photo,
            },
        });

        res.status(201).json(newMaster);
    } catch (error) {
        console.error('Ошибка создания мастера:', error);
        res.status(500).json({ message: 'Ошибка создания мастера' });
    }
};

const updateMaster = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            fullName,
            categoryId,
            regionId,
            shortDescription,
            biography,
            contactPhone,
            contactEmail,
        } = req.body;

        // Обработка массива socialLinks
        let socialLinks = req.body.socialLinks;
        if (Array.isArray(socialLinks)) {
            socialLinks = socialLinks.join(',');
        }

        // Обработка нового фото (если отправили)
        const photo = req.file ? `/uploads/${req.file.filename}` : undefined;

        const updatedMaster = await prisma.master.update({
            where: { id: parseInt(id) },
            data: {
                fullName,
                categoryId: +categoryId,
                regionId: +regionId,
                shortDescription,
                biography,
                contactPhone,
                contactEmail,
                socialLinks,
                ...(photo && { photo }), // Обновлять фото, только если оно есть
            },
        });

        res.status(200).json(updatedMaster);
    } catch (error) {
        console.error('Ошибка обновления мастера:', error);
        res.status(500).json({ message: 'Ошибка обновления мастера' });
    }
};

const deleteMaster = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.master.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Мастер успешно удалён' });
    } catch (error) {
        console.error('Ошибка удаления мастера:', error);
        res.status(500).json({ message: 'Ошибка удаления мастера' });
    }
};

const getMasterAchievements = async (req, res) => {
    try {
        const { id } = req.params;

        const achievements = await prisma.achievement.findMany({
            where: { masterId: parseInt(id) },
        });

        res.status(200).json(achievements);
    } catch (error) {
        console.error('Ошибка получения достижений мастера:', error);
        res.status(500).json({ message: 'Ошибка получения достижений мастера' });
    }
};

module.exports = {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster,
    getMasterAchievements,
};
