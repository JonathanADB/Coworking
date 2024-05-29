import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import crypto from 'crypto';
import { createError } from '../../utils/error.js';

const handleFileUpload = (req, res, next) => {
  try {

    if (!req.files || Object.keys(req.files).length === 0) {
      throw createError(400, "No se encontró ningún archivo para subir");
    }

    // Convertir el objeto de archivos en un array
    const files = Object.values(req.files);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']; // Tipos de archivo permitidos
    const maxSize = 10 * 1024 * 1024; // Tamaño máximo del archivo en bytes (10MB)
    const maxFiles = 10; // Número máximo de archivos permitidos

    if (files.length > maxFiles) {
      throw createError(400, `Solo se permiten hasta ${maxFiles} archivos`);
    }

    const processedFiles = [];

    files.forEach(file => {
      if (!allowedTypes.includes(file.mimetype)) {
        throw createError(400, `Tipo de archivo no permitido: ${file.name}`);
      }

      if (file.size > maxSize) {
        throw createError(400, `Tamaño de archivo excede el límite permitido: ${file.name}`);
      }

      const originalFileName = file.name;
      const extension = path.extname(originalFileName);
      const fileName = crypto.randomUUID() + extension;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      const dirPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'uploads');
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const filePath = path.join(dirPath, fileName);

      file.mv(filePath, (err) => {
        if (err) {
          console.error('Error al mover el archivo:', err);
          throw createError(500, `Error al mover el archivo: ${file.name}`);
        }

        processedFiles.push({
          originalFileName: originalFileName,
          fileName: fileName,
          filePath: filePath
        });

        if (processedFiles.length === files.length) {
          req.body.files = processedFiles;
          next();
        }
      });
    });

  } catch (err) {
    console.error('Error en handleFileUpload:', err);
    next(err);
  }
};

export default handleFileUpload;
