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

//Login Usuario
userRouter.post("/login",async (req, res, next) => {
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
  
      const token = authorizationHeader
  
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
  userRouter.patch('/change-password',authenticate, async (req, res, next) => {
    try {
      const { email, currentPassword, newPassword } = req.body;
  
      const [[user]] = await pool.query('SELECT * FROM users WHERE email = ?', [
        email,
      ]);
  
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'Usuario no encontrado' });
      }
  
      const passwordMatch = await compare(currentPassword, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'La contraseña actual es incorrecta',
        });
      }
  
      const hashedNewPassword = await hash(newPassword, 12);
  
      await pool.query('UPDATE users SET password = ? WHERE id = ?', [
        hashedNewPassword,
        user.id,
      ]);
  
      res.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
      next(error);
    }
  });

  //Recuperar contraseña
  userRouter.post("/forgot-password",authenticate, async (req, res, next) => {
    try {
      const { email } = req.body;
     
      const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);

      if (email !== user.email ) {
        return res
          .status(404)
          .json({ success: false, message: "Correo electrónico no encontrado" });
      }
  
  
      const transporter = nodemailer.createTransport({});
  
      const mailOptions = {
        from: email,
        to: user.email,
        subject: "Recuperación de contraseña",
        text: `Utilice este enlace para restablecer su contraseña:`,
      };
  
      console.log(mailOptions); // con esto compruebo en terminal si funciona el codigo

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

  //Busqueda para enlistar equipos
  userRouter.get("/equipment/searchlist", async (req, res, next) => {
    try {
      const search = req.query.search || '';
      const offset = req.query.offset || 0;
  
      const [equipment] = await dbPool.execute(
        `SELECT name FROM equipment
        WHERE name LIKE ? OR description LIKE ?
        ORDER BY name DESC
        LIMIT 10 OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`]
      );

      const equipmentNames = equipment.map(item => item.name);
  
      res.json({
        success: true,
        message: equipmentNames
       
    });
       
    } catch (err) {
      next(err);
    }
  });

  