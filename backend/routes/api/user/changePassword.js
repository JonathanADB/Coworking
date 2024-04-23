const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



// Ruta para manejar la solicitud de cambio de contraseña
router.post('/change-password', async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

   

    // Respondemos al cliente con un mensaje indicando que la contraseña ha sido cambiada exitosamente
    res.status(200).json({ message: '¡Tu contraseña ha sido cambiada exitosamente!' });
  } catch (error) {
    console.error('Error al procesar la solicitud de cambio de contraseña:', error);
    res.status(500).json({ error: 'Ha ocurrido un error al procesar la solicitud de cambio de contraseña.' });
  }
});

export default router;
