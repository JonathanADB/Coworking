import nodemailer from "nodemailer";
import { createError } from "./error.js";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export const sendVerificationEmail = async (email, code) => {
  // Define el contenido del correo electrónico
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Código de verificación",
    html: `<p>Su código de verificación es: ${code}</p><p>http://localhost:5173/validate</p>`,
  };
  try {
    // Envía el correo utilizando el transporte de Nodemailer
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};

export const sendForgotPasswordEmail = async (email, verificationCode) => {
  // Define el contenido del correo electrónico
  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Recuperación de contraseña",
    html: `<p>Su código de verificación es: ${verificationCode}</p><p>http://localhost:5173/reset-password</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};
