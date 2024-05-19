const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // propio servicio de correo
    auth: {
        user: 'nsalamanca.murgas@gmail.com',
        pass: 'password',
    },
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: 'nsalamanca.murgas@gmail.com',
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
    });
};

module.exports = sendMail;
