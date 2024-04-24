import { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import nodemailer from "nodemailer";

const pool = getPool();

export const forgotPassword = Router();

forgotPassword.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;
   
    const [[user]] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log(user);
    if (email !== user.email ) {
      return res
        .status(404)
        .json({ success: false, message: "Correo electrónico no encontrado" });
    }


    const transporter = nodemailer.createTransport({});

    const mailOptions = {
      from: "tu_correo_electronico@gmail.com",
      to: email,
      subject: "Recuperación de contraseña",
      text: `Utilice este enlace para restablecer su contraseña:`,
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