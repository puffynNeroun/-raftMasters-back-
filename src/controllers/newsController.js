// src/controllers/newsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllNews = async (req, res) => {
    try {
        const news = await prisma.news.findMany();
        res.status(200).json(news);
    } catch (error) {
        console.error('Ошибка получения новостей:', error);
        res.status(500).json({ message: 'Ошибка получения новостей' });
    }
};

const getNewsById = async (req, res) => {
    try {
        const { id } = req.params;
        const newsItem = await prisma.news.findUnique({
            where: { id: parseInt(id) },
        });

        if (!newsItem) {
            return res.status(404).json({ message: 'Новость не найдена' });
        }

        res.status(200).json(newsItem);
    } catch (error) {
        console.error('Ошибка получения новости:', error);
        res.status(500).json({ message: 'Ошибка получения новости' });
    }
};

const createNews = async (req, res) => {
    try {
        const { title, content, type } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        const newNews = await prisma.news.create({
            data: {
                title,
                content,
                type,
                image,
            },
        });

        res.status(201).json(newNews);
    } catch (error) {
        console.error('Ошибка создания новости:', error);
        res.status(500).json({ message: 'Ошибка создания новости' });
    }
};




const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, publishedDate, image } = req.body;

        const updatedNews = await prisma.news.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content,
                publishedDate: new Date(publishedDate),
                image,
            },
        });

        res.status(200).json(updatedNews);
    } catch (error) {
        console.error('Ошибка обновления новости:', error);
        res.status(500).json({ message: 'Ошибка обновления новости' });
    }
};

const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.news.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Новость успешно удалена' });
    } catch (error) {
        console.error('Ошибка удаления новости:', error);
        res.status(500).json({ message: 'Ошибка удаления новости' });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews,
};
