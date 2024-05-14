import "dotenv/config.js";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { validateRegisterRequest } from "../../../validations/validateRegisterRequest.js";
import { compare, hash } from "bcrypt";
import { getPool } from "../../../database/getPool.js";
import crypto from "crypto";
import { validateLoginRequest } from "../../../validations/validateLoginRequest.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import {
  sendVerificationEmail,
  sendForgotPasswordEmail,
} from "../../../utils/sendEmail.js";
import {
  userSchema,
  validateSchema,
  profileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  loginSchema,
} from "../../schemas/userSchemas.js";
import { getUser } from "../../../utils/getUser.js";
import { createError } from "../../../utils/error.js";

const pool = getPool();
const { JWT_SECRET } = process.env;
export const userRouter = Router();

//Registro Usuario
userRouter.post("/register", async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const { firstName, lastName, username, email, password } = await validateRegisterRequest(
      req.body
    );
    const userId = crypto.randomUUID();
    const hashedPassword = await hash(password, 12);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await pool.execute(
      "INSERT INTO users (id, firstName, lastName, username, email, password, verification_code) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, firstName, lastName, username, email, hashedPassword, verificationCode]
    );
    await sendVerificationEmail(email, verificationCode);
    res.status(201).json({
      message: "Usuario registrado exitosamente",
    });
  } catch (err) {
    next(err);
  }
});

//Verificar Usuario
userRouter.post("/validate", async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log(code);
    const { error } = validateSchema.validate({
      code,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [results] = await pool.execute(
      "SELECT * FROM users WHERE verification_code = ?",
      [code]
    );
    if (results.length === 0) {
      throw createError(400, "Código de verificación no válido");
    }
    await pool.execute(
      "UPDATE users SET verified = TRUE WHERE verification_code = ?",
      [code]
    );
    return res.status(200).json({ message: "Cuenta verificada" });
  } catch (error) {
    next(error);
  }
});

//Login Usuario
userRouter.post("/login", async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const { email, username } = await validateLoginRequest(req.body);
    const query = " SELECT * FROM users WHERE email= ? OR username= ?";
    const [[user]] = await pool.execute(query, [email, username]);

    if (!user.verified) {
      throw createError(404, "Usuario no verificado");
    }
    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "30d",
        // MODIFICAR
      }
    );
    res.status(200).json({
      message: "Usuario logueado exitosamente",
      token: token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      },

    });
  } catch (err) {
    next(err);
  }
});

// Ver el perfil de usuario propio
// userRouter.get("/user/profile", authenticate, async (req, res, next) => {
//   try {
//     const user = await getUser(req.headers.authorization);
//     res.status(200).json({
//       profile: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar,
//       },
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// Modificar el propio perfil de usuario
userRouter.put("/user/update/profile/", authenticate, async (req, res, next) => {
  try {
    const user = await getUser(req.headers.authorization);
    const { firstName, lastName, username, email } = req.body;
    const avatarFile = req.file?.avatar || null; // falta el uploadFile de Avatar
    const { error } = profileSchema.validate({
      firstName,
      lastName,
      username,
      email,
      avatar: avatarFile,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [[existingUser]] = await pool.query(
      "SELECT * FROM users WHERE (email = ? OR username = ?) AND id <> ?",
      [email, username, user.id]
    );
    if (existingUser) {
      throw createError(400, "El email y/o username ya existe/n");
    }
    const updateUserQuery = `UPDATE users SET firstName = ?, lastName = ?, username = ?, email = ?, avatar = ?,updatedAt=CURRENT_TIME()
     WHERE id = ?`;
    await pool.execute(updateUserQuery, [
      firstName,
      lastName,
      username,
      email,
      avatarFile,
      user.id,
    ]);
    const [[updatedUser]] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [user.id]
    );
    const token = jwt.sign(
      {
        id: user.id,
        username: username,
        email: email,
      },
      JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    res.status(200).json({
      message: "Perfil actualizado correctamente",
      user: updatedUser,
      token: token,
    });
  } catch (err) {
    next(err);
  }
});

//Cambio de contraseña
userRouter.patch("/change-password", authenticate, async (req, res, next) => {
  try {
    const { email, currentPassword, newPassword, confirmPassword } = req.body;
   
    const { error } = changePasswordSchema.validate({
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }

    const passwordMatch = await compare(currentPassword, user.password);
    if (!passwordMatch) {
      throw createError(
        401,
        "La contraseña actual no coincide con la contraseña almacenada en la BD"
      );
    }
    if (newPassword != confirmPassword) {
      throw createError(401, "Las contraseñas no coinciden");
    }
    const hashedNewPassword = await hash(newPassword, 12);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      user.id,
    ]);
    res.status(200).json({ message: "Contraseña actualizada exitosamente" });  } catch (error) {
    next(error);
  }
});

//Recuperar contraseña
userRouter.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
    const { error } = forgotPasswordSchema.validate({ email });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    await pool.execute(
      "UPDATE users SET verification_code = ?, updatedAt = CURRENT_TIME() WHERE id = ?",
      [verificationCode, user.id]
    );
    await sendForgotPasswordEmail(email, verificationCode);
    res.status(200).json({
      message: "Se ha enviado un correo electrónico con un código de verificación",
    });
  } catch (error) {
    next(error);
  }
});

//Cambio de contraseña
userRouter.post("/reset-password", async (req, res, next) => {
  try {
    const { verification_code, password, confirmPassword } = req.body;
    const { error } = resetPasswordSchema.validate({
      verification_code,
      password,
      confirmPassword,
    });
    if (error) {
      throw createError(400, "Datos de entrada no válidos");
    }
    const [[user]] = await pool.query(
      "SELECT * FROM users WHERE verification_code = ?",
      [verification_code]
    );
    if (!user) {
      throw createError(404, "Usuario no encontrado");
    }
    if (password != confirmPassword) {
      throw createError(401, "Las contraseñas no coinciden");
    }
    const hashedNewPassword = await hash(password, 12);
    await pool.query("UPDATE users SET password = ? WHERE id = ?", [
      hashedNewPassword,
      user.id,
    ]);
    res.status(200).json({ message: "Contraseña actualizada exitosamente" });
  } catch (error) {
    next(error);
  }
});