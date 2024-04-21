import  jwt  from "jsonwebtoken";
import { getPool } from "../../../database/getPool";
import express  from "express";

const router = express.Router();
const {JWT_SECRET} = process.env;
const pool = getPool();



router.post('/validate', async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw new Error("Token de autenticación no proporcionado");
        }

        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            throw new Error("Token de autenticación invalido");
        }

        // Verifica el token usando la clave secreta
        let decoded; 
        try{
            decoded = jwt.verify(token, JWT_SECRET);

        }catch(err){
            throw new Error("Token de autenticación invalido o vencido");
         }

        // Busca al usuario en la base de datos mediante id
        const query = 'SELECT * FROM users WHERE id = ?';
        const [[user]] = await pool.execute(query, [decoded.id]);

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
            }
        });

    } catch (err) {
        next(err);
    }
});
