// emailConfig.js jhonny

const nodemailer = require('nodemailer');

// Configurar transporte SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tucorreo@gmail.com', // Tu dirección de correo electrónico
    pass: 'tucontraseña', // Tu contraseña de correo electrónico
  },
});

module.exports = transporter;
