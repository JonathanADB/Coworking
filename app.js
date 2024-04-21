import express from "express";
import "dotenv/config.js";
import { hash} from "bcrypt";
import { validateRegisterRequest } from "./src/validations/validateRegisterRequest.js";
import { getPool } from "./src/database/getPool.js";
import { validateLoginRequest } from "./src/validations/validateLoginRequest.js";
import  jwt  from "jsonwebtoken";

const {JWT_SECRET} = process.env;

//CARGAR Pool
const pool = getPool()

// CREAR EL SERVIDOR
const app = express();

//DEFINIR PUERTO DE ESCUCHA
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => 
console.log(`Servidor Inicializado escuchando puerto ${PORT}`));

//registro usuarios nuevos
app.use(express.json());


app.post("/register", async (req, res, next)=>{
    try {
       
        // validacion de la informacion de registro
        const {username, email, password} = await validateRegisterRequest (req.body);

        //encriptacion de la contraeña 
        const hashedPassword = await hash(password, 12);
        // generar un id unico
        const userId =crypto.randomUUID()    

        // el methodo transaccion asegura que se ejecute todo o nada
             await pool.execute (
                "INSERT INTO users(id, username,email,password) VALUES (?,?,?,?)",
                [userId, username, email, hashedPassword]
            );
        

        //email confirmacion codigo
        res.json({
            success: true,
            message: "Usuario registrado exitosamente"
        });

    } catch (err) {
        next(err);
        
    }
});



app.post("/login", async (req, res, next)=>{
    try {
        const {email, username } = await validateLoginRequest (req.body);
        
        //buscar el usuario en la base de datos por email o username
        const query = ' SELECT * FROM users WHERE email= ? OR username= ?'
       const [[user]] = await pool.execute(query, [email, username]);

        //si no existe el usuario
         if(!user)throw new Error("Usuario no encontrado");


        const token = jwt.sign({

            id: user.id,
            username: user.username,
            email: user.email,
        },JWT_SECRET, {
            expiresIn: "3d",
        });

        res.json({
            success: true,
            message: "Usuario logeado exitosamente",
            token: token,
        })
        
    } catch (err) {
        next(err)
    }

})