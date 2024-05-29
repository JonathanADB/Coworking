import "dotenv/config.js";
import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import isAdmin from "../../middleware/isAdmin.js";

import { getUser } from "../../../utils/getUser.js";
import { createError } from "../../../utils/error.js";
import { searchFiltersSchema } from "../../schemas/searchSchemas.js";

const dbPool = getPool();
export const adminUsers = Router();

// Ver el listado de usuarios
adminUsers.get(
  "/admin/users",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const { search, offset, limit, direction } = req.query;

      const { error } = searchFiltersSchema.validate({
        search,
        offset,
        limit,
        direction,
      });
      if (error) {
        throw createError(400, "Datos de entrada no válidos");
      }

      const validateDirection = ["ASC", "DESC"];
      const orderDirection = validateDirection.includes(direction)
        ? direction
        : "ASC";

      const validateLimit = [10, 25, 50, 100];
      const limitSet = validateLimit.includes(+limit) ? limit : 10;

      const [users] = await dbPool.execute(
        `SELECT * FROM users
            WHERE username LIKE ? OR firstName LIKE ? OR lastName LIKE ? OR email LIKE ?
            ORDER BY username ${orderDirection}
            LIMIT ${limitSet} OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
      );

      const [[{ usersTotal }]] = await dbPool.execute(
        `SELECT COUNT(*) usersTotal FROM users
            WHERE username LIKE ? OR firstName LIKE ? OR lastName LIKE ? OR email LIKE ?`,
        [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]
      );

      if (!users) {
        throw createError(400, "Impiosible cargar la lista de usuarios");
      }

      res.status(200).json({
        data: users,
        totalResulsts: usersTotal,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Ver el propio perfil de usuario
adminUsers.get(
  "/admin/users/:userId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const [[userData]] = await dbPool.execute(
        "SELECT * FROM users WHERE id = ?",
        [userId]
      );
      if (!userData) {
        throw createError(400, "Usuario no encontrado");
      }

      res.status(200).json({
        data: userData,
      });
    } catch (err) {
      next(err);
    }
  }
);

// Asignación de admin a un usuario
adminUsers.patch(
  "/admin/users/role/:userId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const { role } = req.body;

      const userUpdate = await dbPool.execute(
        "UPDATE users SET role = ?, updatedAt=CURRENT_TIME() WHERE id = ?",
        [role, userId]
      );

      if (!userUpdate)
        throw createError(
          500,
          `No se ha podido asignar el rol de ${role} al usuario`
        );

      res.status(200).json({ success: `Rol del usuario asignado a: ${role}` });
    } catch (err) {
      next(err);
    }
  }
);

// Eliminación de un usuario
adminUsers.delete(
  "/admin/users/delete/:userId",
  authenticate,
  isAdmin,
  async (req, res, next) => {
    try {
      const userId = req.params.userId;

      const userDelete = await dbPool.execute(
        "DELETE FROM users WHERE id = ?",
        [userId]
      );

      if (!userDelete)
        throw createError(500, `No se ha podido eliminar el usuario`);

      res.status(200).json({ success: `El usuario se eliminó correctamente` });
    } catch (err) {
      next(err);
    }
  }
);
