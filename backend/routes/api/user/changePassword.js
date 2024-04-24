import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import { hash, compare } from "bcrypt";

const pool = getPool();

export const changePassword = Router();

changePassword.patch("/change-password", async (req, res, next) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;

    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const passwordMatch = await compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "La contraseña actual es incorrecta",
      });
    }

    const hashedNewPassword = await hash(newPassword, 12);


    await pool.execute("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      userId,
    ]);

    res.json({ success: true, message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
});