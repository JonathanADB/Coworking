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


## Requisitos Previos
- Node.js (v14.x o superior)
- npm (v6.x o superior)



### Instalación

1. Clonar el repositorio utilizando `https://github.com/JonathanADB/Coworking.git`

2. Instala las dependencias del proyecto utilizando `npm install`.

## Configuración

1. Crear un archivo .env en la raíz del backend con el siguiente contenido:

    ```sh
    MODE=
    CORS_ORIGIN=
    DB_HOST=
    DB_PORT=
    DB_USER=
    DB_PASS=
    DB_NAME=
    JWT_SECRET=
    API_HOST=
    VITE_APP_HOST=
    FRONTEND_HOST=
    BREVO_API_KEY= 
    SMTP_HOST=
    SMTP_PORT=
    SMTP_USER=
    SMTP_PASS=
    ```

2. Después de crear el archivo .env, inicializar la base de datos ejecutando el siguiente comando en la terminal:
    
    ```sh
   npm run init-db
   ```

## Inicialización
    
Para iniciar el servidor de desarrollo:

    cd backend
    npm install

Para iniciar el servidor en producción:

    npm start


# Endpoints

Después de crear un usuario, validarse e iniciar sesión se generará un token que será necesario incluir en autorización en las cabeceras de las peticiones subsiguientes.

## USER

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /register - Creación de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /validate - Valida la cuenta de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /login - Inicia sesión en la plataforma
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PUT-blue?style=for-the-badge" style="margin-right: 10px;">
        /user/update/profile - Actualiza el perfil del usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /change-password - Cambia la contraseña existente
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /forgot-password - Envía un código de autenticación para reiniciar la contraseña
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /reset-password - Reinicio de contraseña
    </li>
</ul>

## USERS

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /admin/users - Obtener todos los usuarios
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /users/:userId - Obtener los datos de un usuario en específico
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /admin/users/role/:userId - Cambia el rol de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /admin/users/delete/:userId - Elimina un usuario
    </li>

</ul>

## ROOMS

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /rooms/create-room - Creación de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PUT-blue?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:id - Actualización de los datos de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:id - Elimina un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms - Obtener todos los espacios
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId - Obtener los datos de un espacio en específico
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId/equipment - Añadir equipos existentes a un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/:roomId/equipment - Obtener el equipo presente en un espacio
    </li>
</ul>

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /equipment/add - Añadir equipos
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /equipment/:equipmentId - Actualización de los datos de un equipo
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /admin/equipment/delete/:equipmentId - Elimina un equipo
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /equipment - Obtener todos los equipos
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /admin/equipment/:equipmentId - Obtener los datos de un equipo en específico
    </li>
</ul>

## RESERVATIONS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /reservation/:roomId - Creación de una reserva
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /reservation/:reservationId - Cancelación de reserva
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reservations/:userId - Obtener todas las reservas de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reservations/by-reservationId/:reservationId - Obtener los datos de una reserva en específico
    </li>
</ul>

## REVIEWS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /review/create/:reservationId - Creación de una reseña
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /review/delete/:reviewId - Elimina una reseña
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /review/edit/:reviewId - Actualización de los datos de una reseña
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /review/:reviewId - Obtener los datos de una reseña en específico
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews - Obtener todas las reseñas
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-userId/:userId - Obtener todas las reseñas de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-roomId/:roomId - Obtener todas las reseñas de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /reviews/by-reservationId/:reservationId - Obtener todas las reseñas de una reserva
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /review/check - Verifica si el usuario actual tiene reservas sin reseña
    </li>
</ul>

## INCIDENTS

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:reservationId - Creación de una incidencia
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/PATCH-yellow?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - Actualización de los datos de una incidencia
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - Elimina una incidencia
    </li>
        <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/DELETE-FF0000?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - Elimina una incidencia (administrador)
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents - Obtener todas las incidencias
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/:incidentId - Obtener los datos de una incidencia en específico
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-userid/:userId - Obtener todas las incidencias de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-roomid/:roomId - Obtener todas las incidencias de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /incidents/by-equipmentid/:equipmentId - Obtener todas las incidencias de un equipo
    </li>
</ul>

## MEDIA

<ul style="list-style-type: none; ">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /user/:id/media/add-avatar - Añade o actualiza el avatar de un usuario
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /room/:id/cover - Añade o actualiza la portada de un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /room/:id/images - Añade imágenes a un espacio
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/POST-red?style=for-the-badge" style="margin-right: 10px;">
        /incident/:id/media/add-media - Añade una imágen a una incidencia
    </li>
</ul>

## SEARCH

<ul style="list-style-type: none;">
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/types - Búsqueda de espacios por tipo
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /equipment/searchlist - Búsqueda de equipos
    </li>
    <li style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="https://img.shields.io/badge/GET-339933?style=for-the-badge" style="margin-right: 10px;">
        /rooms/searchReservations - Búsqueda de reservas por sala y fecha
    </li>
</ul>