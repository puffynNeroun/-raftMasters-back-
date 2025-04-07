// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Импорт маршрутов
const masterRoutes = require('./routes/masterRoutes');
const itemRoutes = require('./routes/itemRoutes');
const techniqueRoutes = require('./routes/techniqueRoutes');
const regionRoutes = require('./routes/regionRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');

// Создаем приложение
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Используем маршруты
app.use('/api/masters', masterRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/techniques', techniqueRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/subcategories', subcategoryRoutes);

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error('Ошибка:', err.message);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
