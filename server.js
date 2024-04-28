import express from "express";
import bodyParser from "./routes/middleware/bodyParser.js";
import errorHandler from "./routes/middleware/errorHandler.js";
//import handleCors from "./routes/middleware/handleCors.js";
//import handleFileUpload from "./routes/middleware/handleFileUpload.js";
import notFoundHandler from "./routes/middleware/notFoundHandler.js";
import serveStatic from "./routes/middleware/serveStatic.js";
//import authenticate from "./routes/middleware/authenticateTokenUser.js";
import router from "./routes/routes.js";
//import isAdmin from "./routes/middleware/isAdmin.js";

const app = express();

//app.use(handleCors);
app.use(bodyParser);
//app.use(authenticate);
//app.use(isAdmin);
//app.use(handleFileUpload);
app.use(serveStatic);

app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Express!");
});

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});