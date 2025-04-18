// src/middlewares/authMiddleware.js

/**
 * Middleware для проверки прав администратора.
 * Использует токен из заголовка Authorization.
 */

const adminSecret = process.env.ADMIN_SECRET || 'super-secret-key';

/**
 * Проверка, является ли пользователь администратором.
 * Доступ разрешён только при совпадении токена.
 */
const checkAdmin = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Неавторизован: отсутствует токен' });
    }

    const token = authHeader.split(' ')[1]; // Извлекаем токен после "Bearer"

    if (token !== adminSecret) {
        return res.status(403).json({ message: 'Доступ запрещен: неверный токен' });
    }

    // Всё ок — продолжаем
    next();
};

module.exports = {
    checkAdmin,
};
