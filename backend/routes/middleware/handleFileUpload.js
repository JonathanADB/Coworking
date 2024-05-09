import path from 'path';
import { createError } from '../../utils/error.js';

const handleFileUpload = (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      throw createError(400, "No se encontro ningun archivo para subir");
    }
  
    const file = req.files.file;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo permitidos
    const maxSize = 10 * 1024 * 1024; // Tamaño máximo del archivo en MB
  
    if (!allowedTypes.includes(file.mimetype)) {
      throw createError(404, "Tipo de archivo no permitido");
    }
  
    if (file.size > maxSize) {
      throw createError(400, "Tamaño de archivo excede el límite permitido");
    }
  
    // Modificamos el nombre del archivo para evitar conflictos añadiendo la fecha actual antes del nombre original
    const fileName = Date.now() + '-' + file.name;
    const filePath = path.join(__dirname, 'uploads', fileName);
  
    file.mv(filePath, (err) => {
      if (err) {
        console.error(err);
        throw createError(500, "Error al guardar el archivo");
      }
  
      res.json({ message: 'Archivo subido con éxito', fileName: fileName });
    });
  
    
  } catch (error) {
    next(error)
  }
};
export default handleFileUpload;