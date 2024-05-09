# Gestión de Coworking 
<br>
<div align="center">
<img src="https://github.com/JonathanADB/Coworking/blob/test-2/frontend/src/assets/images/Logo.png">
</div>

<br>

"Gestión de Coworking" es una aplicación web que permite publicar, reservar y gestionar los espacios de coworking de una empresa.
<div align="end"> 
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white">
</div>

## Autores

- Daniela del Carmen Alvarez Carrasquel
- Jorge Alberto Pérez Lehmann
- Eduardo Martínez Frutos
- Jonathan Alberto Domínguez Blanco
- Juan José Ayuso Panezo
- Pablo Campuzano Fuente

## Fase de desarrollo

Actualmente nos encontramos en pleno desarrollo de la aplicación. Sprint 2.

<img src="https://github.com/JonathanADB/Coworking/blob/test-2/frontend/src/assets/images/home.png">


## Sprint 1 (15/04 - 25/04)
Durante este sprint se han realizado las siguientes tareas:

### Análisis
- [x] Análisis Funcional (Consultar documento "ANÁLISIS FUNCIONAL GESTIÓN DE COWORKING 1.0").
- [x] Diseño del Wireframe ("Consultar documento "WIREFRAME COWORKING").
- [x] Diseño del mapa de sitio y flujo de control ("Consultar documento "MAPA DE SITIO Y FLUJO DE CONTROL").

### Implementación y desarrollo del Backend
- Creación del proyecto y configuración inicial.
- Creación de la base de datos y estructura del proyecto Node.js.
- Implementación de middleware y endpoints.

  - Varios

    - [ ] Validar el body de la petición con Joi en todos los endpoints.
    - [ ] Colección de Postman con los endpoints implementados.
    - [ ] Creación de un fichero README.md

### Pasos para arrancar el backend

Para iniciar el backend deberemos realizar los siguientes pasos:

1.  Abrir una terminal de comandos y situarnos en la ruta, current directory, en la que se encuentra la carpeta "backend".
2.  Instalar las dependencias del proyecto haciendo uso del comando:

```
    npm install
```

3.  Configurar el archivo de entorno .env.
4.  Inicializar la base de datos del proyecto ejecutando el siguiente comando:

```
    npm run init-db
```

5. Arrancar el servidor ejecutando el siguiente comando:

```
    npm run start
```

A partir de este momento ya será posible testear el servidor mediante POSTMAN.


## Sprint 2
Actualmente nos encontramos en la fase de desarrollo del Sprint 2, que incluye la creación del proyecto de React, páginas y rutas, formularios de registro y login, entre otros.

### Funcionalidades Implementadas en el Frontend
- Creación de proyecto de React con Vite.
- Implementación de páginas y rutas con React Router.
- Desarrollo de formularios para registro, inicio de sesión y recuperación de contraseña.
- Implementación del contexto para gestionar la información del usuario logueado.
- Desarrollo de formularios para creación y modificación de espacios (solo para administradores).

### Notas
- Validación de endpoint con Joi.
- Respuesta y feedback al usuario mediante tostify.

## Inicialización y Actualidad
El proyecto está en desarrollo y se seguirá trabajando en el Sprint 3.

Para inicializar el proyecto, sigue estos pasos:
1. Instala las dependencias del proyecto utilizando `npm install`.
2. Ejecuta el proyecto en modo de desarrollo utilizando `npm run dev`.
