import "dotenv/config.js";
import chalk from "chalk";

export async function dbSchema(db) {
  const { DB_NAME } = process.env;

  // CREO LA DB SI NO EXISTE
  console.log(chalk.bgBlue("Iniciación de la creación de la base de datos..."));
  await db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
  console.log(
    chalk.green(`Base de datos ${chalk.bgGreen(`${DB_NAME}`)} creada!`)
  );

  // PONGO EN USO LA DB
  await db.query(`USE ${DB_NAME}`);
  console.log(chalk.green(`Usando ${chalk.bgGreen(`${DB_NAME}`)}!`));

  // BORRO LAS TABLAS SI EXISTEN
  console.log(chalk.blue("Borrando las tablas"));
  await db.query(`DROP TABLE IF EXISTS incidents`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`incidents`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS reviews`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`reviews`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS equipmentRooms`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`equipmentRooms`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS equipment`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`equipment`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS media`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`media`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS reservations`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`reservations`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS rooms`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`rooms`)} borrada!`));
  await db.query(`DROP TABLE IF EXISTS users`);
  console.log(chalk.red(`Tabla ${chalk.bgRed(`users`)} borrada!`));

  // CREO LA TABLA DE USERS
  await db.query(`CREATE TABLE users(
    id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    firstName VARCHAR(16),
    lastName VARCHAR(36),
    username VARCHAR(16) UNIQUE NOT NULL,
    email VARCHAR(32) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    verification_code VARCHAR(100),
    verified BOOLEAN DEFAULT 0,
    avatar VARCHAR(200),
    role ENUM("normal","admin") DEFAULT "normal",
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    deletedAt DATETIME
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`users`)} creada!`));

  // CREO LA TABLA ROOMS
  await db.query(`CREATE TABLE rooms(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(16) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(200),
    capacity TINYINT UNSIGNED NOT NULL,
    typeOf CHAR(7) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`rooms`)} creada!`));

  // CREO LA TABLA RESERVATIONS
  await db.query(`CREATE TABLE reservations(
  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
  reservationDateBeg DATETIME NOT NULL,
  reservationDateEnd DATETIME NOT NULL,
  reservationCheckin BOOLEAN DEFAULT false,
  userId CHAR(36) UNIQUE NOT NULL,
  roomId CHAR(36) UNIQUE NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME,
  deletedAt DATETIME,
  
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (roomId) REFERENCES rooms(id)
)`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`reservations`)} creada!`));

  // CREO LA TABLA MEDIA
  await db.query(`CREATE TABLE media(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    url VARCHAR(150) UNIQUE NOT NULL,
    userId CHAR(36), 
    roomId CHAR(36),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`media`)} creada!`));

  // CREO LA TABLA EQUIPMENT
  await db.query(`CREATE TABLE equipment(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(16) UNIQUE NOT NULL,
	  description TEXT NOT NULL,
    inventory TINYINT UNSIGNED NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`equipment`)} creada!`));

  // CREO LA TABLA EQUIPMENTROOMS
  await db.query(`CREATE TABLE equipmentRooms(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    equipmentId CHAR(36) UNIQUE NOT NULL,
    roomId CHAR(36) UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    FOREIGN KEY (equipmentId) REFERENCES equipment(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`equipmentRooms`)} creada!`));

  // CREO LA TABLA REVIEWS
  await db.query(`CREATE TABLE reviews(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    rate TINYINT UNSIGNED NOT NULL,
    description TEXT,
    reservationId CHAR(36) UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    FOREIGN KEY (reservationId) REFERENCES reservations(id)
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`reviews`)} creada!`));

  // CREO LA TABLA INCIDENTS
  await db.query(`CREATE TABLE incidents(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    description TEXT NOT NULL,
    status ENUM("pending","resolved") DEFAULT "pending",
    userId CHAR(36) NOT NULL,
    roomId CHAR(36) NOT NULL,
    equipmentId CHAR(36) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    FOREIGN KEY (equipmentId) REFERENCES equipment(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (roomId) REFERENCES rooms(id)
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`incidents`)} creada!`));

  console.log(
    chalk.bgGreen(`Proceso de creación de la base de datos terminada`)
  );
}
