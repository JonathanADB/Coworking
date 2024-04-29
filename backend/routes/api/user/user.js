import "dotenv/config.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { validateRegisterRequest } from "../../../validations/validateRegisterRequiest.js";
import { compare, hash } from "bcrypt";
import { getPool } from "../../../database/getPool.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { validateLoginRequest } from "../../../validations/validateLoginRequest.js";
import authenticate from "../../middleware/authenticateTokenUser.js";

const pool = getPool();
const { JWT_SECRET } = process.env;
export const userRouter = Router();

//Registro Usuario
userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = await validateRegisterRequest(
      req.body
    );
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

//Login Usuario
userRouter.post("/login", async (req, res, next) => {
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

//Validar Usuario
userRouter.get("/validate", async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      throw new Error("Token de autenticación no proporcionado");
    }

    const token = authorizationHeader;

    if (!token) {
      throw new Error("Token de autenticación invalido");
    }

    // Verifica el token usando la clave secreta
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new Error("Token de autenticación invalido o vencido");
    }

    // Busca al usuario en la base de datos mediante email
    const query = "SELECT * FROM users WHERE email = ?";
    const [[user]] = await pool.execute(query, [decoded.email]);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Si el usuario es encontrado, devuelve información sobre el usuario
    res.json({
      success: true,
      message: "Usuario validado exitosamente",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

//Cambio de contraseña
userRouter.patch("/change-password", authenticate, async (req, res, next) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    const passwordMatch = await compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "La contraseña actual es incorrecta",
      });
    }

    const hashedNewPassword = await hash(newPassword, 12);

    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      user.id,
    ]);

    res.json({ success: true, message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
});

//Recuperar contraseña
userRouter.post("/forgot-password", authenticate, async (req, res, next) => {
  try {
    const { email } = req.body;
    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!user) {
      throw new Error("Email incorrecto");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.mailgun.org",
      port: 587,
      secure: false,
      auth: {
        user: "postmaster@sandboxf52e34a4951446f59332ef7559108be2.mailgun.org",
        pass: "867e8ee7432e7ca9a3c2e996867f99c6-2175ccc2-b3e57cde",
      },
    });
    const newPassword = await hash(generatePassword(10), 12);
    await pool.execute(
      "UPDATE users SET password = ?, updatedAt = CURRENT_TIME() WHERE id = ?",
      [newPassword, user.id]
    );
    const mailOptions = {
      from: "postmaster@sandboxf52e34a4951446f59332ef7559108be2.mailgun.org",
      to: email,
      subject: "Recuperación de contraseña",
      text: "Tu nueva contraseña es " + newPassword,
    };
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message:
        "Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña",
    });
  } catch (error) {
    next(error);
  }
});

function generatePassword(passwordLength) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters.charAt(index);
  }
  return password;
}
