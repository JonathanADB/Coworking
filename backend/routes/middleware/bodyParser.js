const bodyParser = (req, res, next) => {

    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')  {
      //|| req.method === 'GET'
      let data = '';
  
      req.on('data', chunk => {
        data += chunk;
      });
  
      req.on('end', () => {
        try {
          //if (req.body)  --> solucion para el endpoint GET reviews
          req.body = JSON.parse(data);
          next();
        } catch (error) {
          res.status(400).json({ error: 'Error al analizar el cuerpo de la solicitud' });
        }
      });
    } else {
      next();
    }
  };
  
export default bodyParser;