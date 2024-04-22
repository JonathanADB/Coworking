// forgotPassword.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../../utils/emailConfig'); // Ruta de nodemailer    *--hice una configuracion, luego revisar--*
// Importar el modelo de usuario y cualquier otra dependencia necesaria

// Ruta para manejar la solicitud de recuperación de contraseña
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Verificar si el usuario con el correo electrónico proporcionado existe en la base de datos
    // Si existe, generar un token único para el restablecimiento de contraseña y almacenarlo en la base de datos

    // Generar un token único para el restablecimiento de contraseña
    const resetToken = jwt.sign({ email }, 'secreto', { expiresIn: '1h' }); 

    // Enviar correo electrónico al usuario con un enlace para restablecer la contraseña
    transporter.sendMail({
      from: 'cabronesstormgain@gmail.com', 
      to: email,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola,</p>
        <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
        <a href="https://tuaplicacion.com/reset-password?token=${resetToken}">Restablecer contraseña</a>
        <p>Si no solicitaste restablecer tu contraseña, ignora este correo electrónico.</p>
      `
    });

    // Respondemos al cliente con un mensaje indicando que se ha enviado un correo electrónico con instrucciones para restablecer la contraseña
    res.status(200).json({ message: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña.' });
  } catch (error) {
    console.error('Error al procesar la solicitud de recuperación de contraseña:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al procesar la solicitud de recuperación de contraseña.' });
  }
});

module.exports = router;
