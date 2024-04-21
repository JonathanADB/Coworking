import express from 'express';
import bodyParser from './routes/middleware/bodyParser';
import errorHandler from './routes/middleware/errorHandler';
import handleCors from './routes/middleware/handleCors';
import handleFileUpload from './routes/middleware/handleFileUpload';
import notFoundHandler from './routes/middleware/notFoundHandler';
import serveStatic from './routes/middleware/serveStatic';
// Middleware Daniela
import routes from './routes/routes';

const app = express();

app.use(handleCors);
app.use(bodyParser);
// Middleware Daniela
app.use(handleFileUpload);
app.use(serveStatic);

app.use('/api', routes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});