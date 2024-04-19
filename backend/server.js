import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
