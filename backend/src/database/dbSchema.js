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
    admin BIT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`users`)} creada!`));

  // CREO LA TABLA ROOMS
  await db.query(`CREATE TABLE rooms(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    name VARCHAR(16) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    capacity TINYINT UNSIGNED NOT NULL,
    rating TINYINT UNSIGNED,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`rooms`)} creada!`));

  // CREO LA TABLA RESERVATIONS
  await db.query(`CREATE TABLE reservations(
	  id CHAR(36) UNIQUE NOT NULL PRIMARY KEY,
    reservationDate DATETIME NOT NULL,
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
    url VARCHAR(50) UNIQUE NOT NULL,
    userId CHAR(36) UNIQUE NOT NULL,
    roomId CHAR(36) UNIQUE NOT NULL,
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
    roomId CHAR(36) UNIQUE NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME,
    deletedAt DATETIME,
    
    FOREIGN KEY (roomId) REFERENCES rooms(id)
  )`);
  console.log(chalk.green(`Tabla ${chalk.bgGreen(`equipment`)} creada!`));

  console.log(
    chalk.bgGreen(`Proceso de creación de la base de datos terminada`)
  );
}
