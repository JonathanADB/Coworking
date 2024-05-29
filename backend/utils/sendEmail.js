import nodemailer from "nodemailer";
import { createError } from "./error.js";
import fs from 'fs';
import handlebars from "handlebars";

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

/*email de registro y codigo de verificaciñon */
export const sendVerificationEmail = async (email, code) => {
const htmlRegistro = "C:/Users/danie/Documents/PROYECTO-COWORQUEEN-git/COWORQUEEN/backend/utils/emails/verificationEmail.html";  //correo de verificacion 
const htmltemplate = fs.readFileSync(htmlRegistro, 'utf8');
const template = handlebars.compile(htmltemplate);
const htmlContent = template({code});

  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Código de verificación",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};


/*email de validacion de codigo de verificaciñon */
export const sendValidateEmail = async (email) => {
const htmlRegistro = "C:/Users/danie/Documents/PROYECTO-COWORQUEEN-git/COWORQUEEN/backend/utils/emails/validationEmail.html";  //correo de validación
const htmlContent = fs.readFileSync(htmlRegistro, 'utf8');

  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Validacion Exitosa",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};

/* email de recuperacion de contraseña  */
export const sendForgotPasswordEmail = async (email, verificationCode) => {
const htmlRegistro = "C:/Users/danie/Documents/PROYECTO-COWORQUEEN-git/COWORQUEEN/backend/utils/emails/forgotPassword.html";  //correo de recuperacion contraseña 
const htmltemplate = fs.readFileSync(htmlRegistro, 'utf8');
const template = handlebars.compile(htmltemplate);
const htmlContent = template({verificationCode});

  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Recuperación de contraseña",
    html: htmlContent,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};

/* email informativo de cambio de contraseña  */
export const sendChangePasswordEmail = async (email) => {
const htmlRegistro = "C:/Users/danie/Documents/PROYECTO-COWORQUEEN-git/COWORQUEEN/backend/utils/emails/changePassword.html";  //correo de recuperacion contraseña 
const htmlContent = fs.readFileSync(htmlRegistro, 'utf8');


  const mailOptions = {
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Cambio de Contraseña",
    html: htmlContent,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};

/* email informativo de creacion de reserva  */
export const sendCreatedReservationEmail = async (email, name, user, roomName, reservationDateBeg, reservationDateEnd) => {
const htmlRegistro = "C:/Users/danie/Documents/PROYECTO-COWORQUEEN-git/COWORQUEEN/backend/utils/emails/createdReservation.html";  //correo de recuperacion contraseña 
const htmltemplate = fs.readFileSync(htmlRegistro, 'utf8');
const template = handlebars.compile(htmltemplate);
const htmlContent = template({name, user, roomName, reservationDateBeg, reservationDateEnd});


  const mailOptions = { 
    from: SMTP_USER,
    to: email,
    subject: "COWORQUEEN - Reserva Existosa",
    html: htmlContent,
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw createError(503, "Error al enviar el correo");
  }
};