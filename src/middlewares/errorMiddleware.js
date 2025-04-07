// src/middlewares/errorMiddleware.js

const errorHandler = (err, req, res, next) => {
    console.error('Ошибка:', err.message);

    res.status(err.statusCode || 500).json({
        message: err.message || 'Внутренняя ошибка сервера',
    });
};

module.exports = errorHandler;
