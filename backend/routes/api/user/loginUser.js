import "dotenv/config.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { validateLoginRequest } from "../../../validations/validateLoginRequest.js";
import { getPool } from "../../../database/getPool.js";

const router = Router();
const { JWT_SECRET } = process.env;

let pool = getPool();

router.post("/login", async (req, res, next) => {
  try {
    const { email, username } = await validateLoginRequest(req.body);
    const query = " SELECT * FROM users WHERE email= ? OR username= ?";
    const [[user]] = await pool.execute(query, [email, username]);

    if (!user) throw new Error("Usuario no encontrado");
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.json({
      success: true,
      message: "Usuario logeado exitosamente",
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
