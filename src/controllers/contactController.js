const nodemailer = require('nodemailer');

/**
 * Контроллер обработки формы "Контакты".
 * Принимает name, email, message и отправляет письмо на указанный email.
 */
const sendContactForm = async (req, res) => {
    const { name, email, message } = req.body;

    // Проверка на пустые поля
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' });
    }

    try {
        // Создаём транспорт через Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS, // пароль приложения Gmail
            },
        });

        // Формируем письмо
        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER,
            subject: 'Новое сообщение с сайта',
            html: `
        <h2>Новое сообщение с формы "Контакты"</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Сообщение:</strong><br>${message}</p>
      `,
        };

        // Отправляем письмо
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Сообщение успешно отправлено!' });
    } catch (error) {
        console.error('Ошибка при отправке письма:', error.message);
        res.status(500).json({ message: 'Не удалось отправить сообщение. Попробуйте позже.' });
    }
};

module.exports = {
    sendContactForm,
};
