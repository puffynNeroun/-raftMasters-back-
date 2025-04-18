// src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('./middlewares/loggerMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');

// Импорт маршрутов
const masterRoutes = require('./routes/masterRoutes');
const itemRoutes = require('./routes/itemRoutes');
const newsRoutes = require('./routes/newsRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const materialRoutes = require('./routes/materialRoutes');
const techniqueRoutes = require('./routes/techniqueRoutes');
const regionRoutes = require('./routes/regionRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const contactRoutes = require('./routes/contactRoutes');


// Создаем приложение
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger);

// Используем маршруты
app.use('/api/masters', masterRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/techniques', techniqueRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/achievements', achievementRoutes);
app.use('/api/contact', contactRoutes);

// Обработка ошибок
app.use(errorHandler);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
