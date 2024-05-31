# Frontend

## Gestión de Coworking - COWorking

<div align="center">
<img src="https://github.com/JonathanADB/Coworking/blob/test-2/frontend/src/assets/images/Logo.png">
</div>
"Gestión de Coworking" es una aplicación web que permite publicar, reservar y gestionar los espacios de coworking de una empresa.

<div align="end"> 
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
</div>


### Autores

- Daniela del Carmen Alvarez Carrasquel
- Jorge Alberto Pérez Lehmann
- Eduardo Martínez Frutos
- Jonathan Alberto Domínguez Blanco
- Pablo Campuzano Fuente


### Tecnologías Utilizadas en el Frontend

- React.js
- React Router
- Context API
- Vite
- TailwindCSS

## Requisitos Previos
- Node.js (v14.x o superior)
- npm (v6.x o superior)



### Instalación

1. Clonar el repositorio utilizando `https://github.com/JonathanADB/Coworking.git`
2. Instala las dependencias del proyecto utilizando `npm install`.

### Configuración
Crear un archivo .env en la raíz del frontend con el siguiente contenido:

```sh
VITE_APP_HOST=
```

## Inicialización
    
Para iniciar el servidor de desarrollo:

    cd backend
    npm install

Para construir el proyecto para producción:

    npm run build

# Rutas y Navegación

## Rutas Públicas
- **/**: Página de inicio
  - **Descripción**: Página de inicio de la aplicación. Muestra la portada antes de iniciar sesión.
  
- **/register**: Página de registro
  - **Descripción**: Permite a los usuarios crear una nueva cuenta.
  
- **/validate**: Validar usuario
  - **Descripción**: Permite validar la cuenta de un usuario a través de un enlace enviado por correo electrónico.
  
- **/login**: Página de inicio de sesión
  - **Descripción**: Permite a los usuarios iniciar sesión en la plataforma.
  
- **/reset-password**: Reiniciar contraseña
  - **Descripción**: Permite a los usuarios reiniciar su contraseña.
  
- **/change-password**: Cambiar contraseña
  - **Descripción**: Permite a los usuarios cambiar su contraseña.
  
- **/forgot-password**: Olvidó su contraseña
  - **Descripción**: Permite a los usuarios solicitar un enlace para reiniciar su contraseña.

## Rutas Protegidas
- **/profile**: Perfil de usuario
  - **Descripción**: Página para ver el perfil del usuario autenticado.
  
- **/edit-profile**: Editar perfil
  - **Descripción**: Permite al usuario autenticado editar su perfil.
  
- **/help**: Página de ayuda
  - **Descripción**: Página de ayuda para los usuarios autenticados.
  
- **/reservations**: Mis reservas
  - **Descripción**: Muestra una lista de reservas del usuario autenticado.
  
- **/reservation/:id/create-incident**: Crear incidencia
  - **Descripción**: Permite al usuario autenticado crear una incidencia para una reserva específica.
  
- **/incident/:id**: Ver incidencia
  - **Descripción**: Permite al usuario autenticado ver los detalles de una incidencia específica.

## Rutas de Reseñas
- **/review/:reviewId**: Ver review
  - **Descripción**: Muestra los detalles de una review específica.
  
- **/reservation/:reservationId/review**: Crear review
  - **Descripción**: Permite al usuario crear una review para una reserva específica.
  
- **/review/:reviewId/edit**: Editar review
  - **Descripción**: Permite al usuario editar una review existente.

## Rutas de Reservas
- **/create-reservation**: Crear reserva
  - **Descripción**: Permite al usuario autenticado crear una nueva reserva.
  
- **/room/:id/reserve**: Reservar espacio
  - **Descripción**: Permite al usuario autenticado reservar un espacio específica.
  
- **/reservation/:id**: Ver reserva
  - **Descripción**: Muestra los detalles de una reserva específica.

## Rutas de Admin
- **/admin**: Panel de administración
  - **Descripción**: Panel principal para los administradores.
  
- **/admin/equipment**: Lista de equipos
  - **Descripción**: Muestra una lista de todos los equipos disponibles.
  
- **/admin/equipment/add**: Añadir equipo
  - **Descripción**: Permite a los administradores añadir nuevos equipos.
  
- **/admin/equipment/:id**: Ver equipo
  - **Descripción**: Muestra los detalles de un equipo específico.
  
- **/admin/users**: Lista de usuarios
  - **Descripción**: Muestra una lista de todos los usuarios.
  
- **/admin/users/:id**: Ver usuario
  - **Descripción**: Muestra los detalles de un usuario específico.
  
- **/create-room**: Crear espacio
  - **Descripción**: Permite a los administradores crear un nuevo espacio.
  
- **/room/:id**: Ver espacio
  - **Descripción**: Muestra los detalles de un espacio específico.
  
- **/admin/incidents**: Lista de incidencias
  - **Descripción**: Muestra una lista de todas las incidencias.
  
- **/admin/rooms**: Lista de espacios
  - **Descripción**: Muestra una lista de todas los espacios.
  
- **/admin/room/:id**: Ver espacio como administrador
  - **Descripción**: Muestra los detalles de una espacio específico para los administradores.
  
- **/admin/room/:id/edit**: Editar espacio
  - **Descripción**: Permite a los administradores editar los detalles de un espacio específico.
  
- **/admin/reviews**: Lista de reseñas
  - **Descripción**: Muestra una lista de todas las reseñas.
  
- **/admin/reservations**: Lista de reservas
  - **Descripción**: Muestra una lista de todas las reservas.

## Rutas de Error
- **\***: Página no encontrada
  - **Descripción**: Muestra un mensaje de error cuando la ruta no coincide con ninguna de las rutas definidas.

## Notificaciones
- **ToastContainer**: Contenedor de notificaciones
  - **Descripción**: Muestra notificaciones en la parte superior central de la pantalla con un tiempo de cierre automático de 4500 ms.