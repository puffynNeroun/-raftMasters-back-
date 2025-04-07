// src/utils/responseUtils.js

const sendSuccess = (res, data, message = 'Успешно') => {
    res.status(200).json({ message, data });
};

const sendError = (res, error, statusCode = 500) => {
    res.status(statusCode).json({ message: error.message || 'Ошибка сервера' });
};

module.exports = {
    sendSuccess,
    sendError,
};
