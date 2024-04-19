import fs from 'fs';
import path from 'path';

const handleFileUpload = (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No se encontró ningún archivo para subir' });
  }

  const file = req.files.file;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo permitidos
  const maxSize = 10 * 1024 * 1024; // Tamaño máximo del archivo en MB

  if (!allowedTypes.includes(file.mimetype)) {
    return res.status(400).json({ error: 'Tipo de archivo no permitido' });
  }

  if (file.size > maxSize) {
    return res.status(400).json({ error: 'Tamaño de archivo excede el límite permitido' });
  }

  // Modificamos el nombre del archivo para evitar conflictos añadiendo la fecha actual antes del nombre original
  const fileName = Date.now() + '-' + file.name;
  const filePath = path.join(__dirname, 'uploads', fileName);

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al guardar el archivo' });
    }

    res.json({ message: 'Archivo subido con éxito', fileName: fileName });
  });
};

export default handleFileUpload;