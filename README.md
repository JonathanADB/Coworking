# Gestión de Coworking - COWorking

"Gestión de Coworking" es una aplicación web que permite publicar, reservar y gestionar los espacios de coworking de una empresa.

## Autores

- Daniela del Carmen Alvarez Carrasquel
- Jorge Alberto Pérez Lehmann
- Eduardo Martínez Frutos
- Jonathan Alberto Domínguez Blanco
- Juan José Ayuso Panezo
- Pablo Campuzano Fuente

## Fase de desarrollo

Actualmente nos encontramos en pleno desarrollo de la aplicación. Sprint 1.

### Sprint 1

Durante este sprint estamos llevando a cabo las siguientes competencias:

- Análisis

  - [x] Análisis Funcional (Consultar documento "ANÁLISIS FUNCIONAL GESTIÓN DE COWORKING 1.0")
  - [x] Diseño del Wireframe ("Consultar documento "WIREFRAME COWORKING)
  - [x] Diseño del mapa de sitio y flujo de control ("Consultar documento "MAPA DE SITIO Y FLUJO DE CONTROL")

- Implementación y desarrollo del Backend

  - Creación del proyecto

    - [x] Creación de repositorio en gitHub y configuración
    - [x] Creación de la base de datos con datos fijos (tipo de espacio, equipamiento, categoría incidencia y usuario admin).
    - [x] Creación de proyecto de Node y estructura inicial de carpetas.
    - [x] Creación del servidor con Express.
    - [x] Creación de la conexión con la base de datos desde Node.

  - Middlewares

    - [ ] Middleware 404 not found.
    - [ ] Middleware gestión de errores.
    - [ ] Middleware parseo del body de la petición.
    - [ ] Middleware upload de files.
    - [ ] Middleware definición directorio recursos estáticos (imágenes).
    - [ ] Middleware: cors.
    - [ ] Middleware verificación de autenticación de usuarios.

  - Endpoints

    - [ ] Endpoint registro de usuarios.
    - [ ] Endpoint validación de usuario.
    - [ ] Endpoint login de usuarios.
    - [ ] Endpoint recuperación de contraseña.
    - [ ] Endpoint cambio de contraseña.
    - [ ] Endpoint lista categorías de incidencias.
    - [ ] Endpoint lista de equipamiento.
    - [ ] Endpoint lista tipo de espacio.
    - [ ] Endpoint creación de un espacio al completo (solo admin).
    - [ ] Endpoint para reservar y cancelar la reserva de un espacio.
    - [ ] Endpoint para confirmar o rechazar la reserva con envío de e-mail al cliente (solo admin).
    - [ ] Endpoint rating del espacio después de su uso (de 1 a 5).
    - [ ] Endpoint listado de espacios con filtro/búsqueda y ordenación.
    - [ ] Endpoint visualización del espacio.

  - Varios

    - [ ] Validar el body de la petición con Joi en todos los endpoints.
    - [ ] Colección de Postman con los endpoints implementados.
    - [ ] Creación de un fichero README.md

### Pasos para arrancar el backend

Para arrancar el backend, deberemos realizar los siguientes pasos:

1.  Abrir una terminal de comandos y situarnos en la ruta, current directory, en la que se encuentra la carpeta "backend".
2.  Instalar las dependencias del proyecto haciendo uso del comando:
```
    npm install
```   
