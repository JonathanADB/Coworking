import express from "express";
import "dotenv/config.js";
import errorHandler from "./routes/middleware/errorHandler.js";
import handleCors from "./routes/middleware/handleCors.js";
import notFoundHandler from "./routes/middleware/notFoundHandler.js";
import serveStatic from "./routes/middleware/serveStatic.js";
import router from "./routes/routes.js";
import { task } from './reservationCheckIn.js';

const app = express();

app.use(handleCors);
app.use(express.json());
app.use('/uploads', serveStatic);

app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Express!");
});

app.use(router);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
  task.start();
});
