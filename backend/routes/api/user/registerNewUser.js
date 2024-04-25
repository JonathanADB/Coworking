import { Router } from "express";
import { validateRegisterRequest } from "../../../validations/validateRegisterRequiest.js";
import { hash } from "bcrypt";
import { getPool } from "../../../database/getPool.js";
import crypto from "crypto";

const router = Router();
const pool = getPool();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = await validateRegisterRequest(req.body);
  console.log("usuario validado");
    

    const hashedPassword = await hash(password, 12);

    const userId = crypto.randomUUID();

    await pool.execute(
      "INSERT INTO users(id, username, email, password) VALUES (?,?,?,?)",
      [userId, username, email, hashedPassword]
    );
    console.log("usuario agregado");
    res.json({
      success: true,
      message: "Usuario registrado exitosamente",
    });
  } catch (err) {
    next(err);
  }
});

export default router;