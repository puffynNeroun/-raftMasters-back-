const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createAchievement = async (req, res) => {
    try {
        const { masterId, title, year, description } = req.body;

        const newAchievement = await prisma.achievement.create({
            data: {
                masterId,
                title,
                year,
                description,
            },
        });

        res.status(201).json(newAchievement);
    } catch (error) {
        console.error('Ошибка создания достижения:', error);
        res.status(500).json({ message: 'Ошибка создания достижения' });
    }
};

module.exports = {
    createAchievement,
};
