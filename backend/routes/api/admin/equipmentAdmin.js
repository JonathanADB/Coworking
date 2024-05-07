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
      const { name, description, inventory } = req.body;
      const { error } = addEquipmentSchema.validate({
        name,
        description,
        inventory,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }
      await dbPool.execute(
        `INSERT INTO equipment(id, name, description, inventory) VALUES (?, ?, ?, ?)`,
        [crypto.randomUUID(), name, description, inventory]
      );
      res.json({
        success: true,
        message: `Producto ${name} se añadió correctamente`,
      });
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
      const { name, description, inventory } = validateEquipmentEditRequest(
        req.body
      );
      await dbPool.execute(
        `UPDATE equipment SET name=?, description=?, inventory=?, updatedAt=CURRENT_TIME()
            WHERE id=?`,
        [
          name ? name : equipment.name,
          description ? description : equipment.description,
          inventory ? inventory : equipment.inventory,
          equipmentId,
        ]
      );
      res.json({
        success: true,
        message: `Producto ${name} se actualizo correctamente`,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Borrar equipos
equipmentAdminRouter.delete(
  "/equipment/:equipmentId",
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
      await dbPool.execute(`DELETE FROM equipment WHERE id=?`, [equipmentId]);
      res.json({
        success: true,
        message: `Producto borrado correctamente`,
      });
    } catch (err) {
      next(err);
    }
  }
);

