import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateEquipmentId } from "../../../validations/validateEquipmentId.js";
import { validateEquipmentEditRequest } from "../../../validations/validateEquipmentEdition.js";
import isAdmin from "../../middleware/isAdmin.js";
import {
  addEquipmentSchema,
  updateEquipmentSchema,
  deleteEquipmentSchema,
} from "../../schemas/equipmentAdminSchemas.js";
import { createError } from "../../../utils/error.js";

const dbPool = getPool();

export const equipmentAdminRouter = Router();

// agregar equipos solo admin
equipmentAdminRouter.post(
  "/equipment/add",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { name, description } = req.body;
      const { error } = addEquipmentSchema.validate({
        name,
        description,
      });

      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const add = await dbPool.execute(
        `INSERT INTO equipment(id, name, description) VALUES (?, ?, ?)`,
        [crypto.randomUUID(), name, description]
      );

      res.status(201).json({
        message: `Producto ${name} se añadió correctamente`,
      });

      if (!add) throw createError(401, "No se ha podido añadir el producto");
    } catch (err) {
      next(err);
    }
  }
);

//Update de equipos
equipmentAdminRouter.patch(
  "/equipment/:equipmentId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const equipmentId = req.params.equipmentId;
      const { error } = updateEquipmentSchema.validate({
        equipmentId,
      });

      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const equipment = await validateEquipmentId(equipmentId);
      const { name, description } = validateEquipmentEditRequest(req.body);

      const updateEquipment = await dbPool.execute(
        `UPDATE equipment SET name=?, description=?, updatedAt=CURRENT_TIME()
            WHERE id=?`,
        [
          name ? name : equipment.name,
          description ? description : equipment.description,
          equipmentId,
        ]
      );
      res.status(200).json({
        message: `Producto ${name} se actualizo correctamente`,
      });

      if (!updateEquipment) {
        throw createError(401, "No se ha podido modificar el producto");
      }
    } catch (err) {
      next(err);
    }
  }
);
// Borrar equipos
equipmentAdminRouter.delete(
  "/admin/equipment/delete/:equipmentId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const equipmentId = req.params.equipmentId;
      const { error } = deleteEquipmentSchema.validate({
        equipmentId,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const deleteEquipment = await dbPool.execute(
        `DELETE FROM equipment WHERE id=?`,
        [equipmentId]
      );

      res.status(200).json({
        message: `Producto borrado correctamente`,
      });

      if (!deleteEquipment)
        throw createError(401, "No se ha podido borrar el producto");
    } catch (err) {
      next(err);
    }
  }
);

// Listar equipo por su id
equipmentAdminRouter.get(
  "/admin/equipment/:equipmentId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const equipmentId = req.params.equipmentId;
      const { error } = validateEquipmentId(equipmentId);
      console.log(error);
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const [[equipment]] = await dbPool.execute(
        `SELECT * FROM equipment WHERE id = ?`,
        [equipmentId]
      );
      console.log(equipment);

      res.status(200).json({ data: equipment });
    } catch (err) {
      next(err);
    }
  }
);
// Listar todos los equipos disponibles
equipmentAdminRouter.get(
  "/equipment",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const [equipment] = await dbPool.execute(
        `SELECT * FROM equipment`
      );

      res.status(200).json({ data: equipment });
    } catch (err) {
      next(err);
    }
  }
);