import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createError } from '../../utils/error.js';

const handleFileUpload = (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      throw createError(400, "No se encontro ningun archivo para subir");
    }
  
    const file = req.files.file;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo permitidos
    const maxSize = 10 * 1024 * 1024; // Tamaño máximo del archivo en bytes (10MB)
  
    if (!allowedTypes.includes(file.mimetype)) {
      throw createError(400, "Tipo de archivo no permitido");
    }
  
    if (file.size > maxSize) {
      throw createError(400, "Tamaño de archivo excede el límite permitido");
    }
  
    // Modificamos el nombre del archivo para evitar conflictos añadiendo la fecha actual antes del nombre original
    const fileName = Date.now() + '-' + file.name;
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dirPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'uploads', 'avatar');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, fileName);
  
    file.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        throw createError(500, "Error al mover el archivo");
      }

      req.body.fileName = fileName;
      req.body.filePath = filePath;

      next();
    });
  } catch (err) {
    next(err);
  }
};

export default handleFileUpload;