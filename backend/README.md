# Gestión de Coworking 

<div align="center">
<img src="https://github.com/JonathanADB/Coworking/blob/main/frontend/src/assets/imgreadme/titulo.png">
</div> 

"Gestión de Coworking" es una aplicación web que facilita la publicación, reserva y gestión de espacios de coworking para empresas.
<br><br>

<div display="flex">
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">
</div>



## Autores

- Daniela del Carmen Alvarez Carrasquel
- Jorge Alberto Pérez Lehmann
- Eduardo Martínez Frutos
- Jonathan Alberto Domínguez Blanco
- Pablo Campuzano Fuente

### Sprint 1 (15/04 - 25/04)

Durante este sprint, hemos completado:

- **Análisis**
  - Análisis Funcional.
  - Diseño del Wireframe.
  - Diseño del mapa de sitio y flujo de control.

- **Implementación y desarrollo del Backend**
  - Creación del proyecto
  - Configuración de la base de datos y del servidor con Express.
  - Conexión con la base de datos desde Node.

- **Middlewares**
  - Middleware para manejo de errores y parseo del body de la petición.
  - Middleware para la gestión de recursos estáticos.
  - Middleware de autenticación de usuarios.

- **Endpoints**
  - Registro, validación y login de usuarios.
  - Recuperación y cambio de contraseña.
  - Listado de categorías de incidencias, equipamiento y tipo de espacio.
  - Creación, reserva y cancelación de espacios.
  - Confirmación o rechazo de reservas con notificación por email.
  - Calificación de espacios.
  - Listado y visualización de espacios con filtros y ordenación.

- **Varios**
  - Validación de peticiones con Joi.
  - Colección de Postman con los endpoints implementados.

  ### Tecnologías utilizadas

- Postman
- Node.js
- Express
- MySQL
- MySQL Workbench

### Pasos para arrancar el backend

1. Abrir una terminal en la carpeta "backend".
2. Instalar las dependencias del proyecto con `npm install`.
3. Configurar el archivo `.env`.
4. Inicializar la base de datos con `npm run init-db`.
5. Arrancar el servidor con `npm run start`.

¡Con estos pasos, el servidor estará listo para ser probado usando POSTMAN!