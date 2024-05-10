import "dotenv/config.js";
import bcrypt from "bcrypt";
import chalk from "chalk";
import { verify } from "crypto";

export async function loadBaseData(db) {
  // Usuarios iniciales para la carga de la base de datos
  console.log(chalk.bgBlue("Cargando usuarios iniciales!"));
  const users = [
    {
      id: crypto.randomUUID(),
      username: "Admin",
      email: "admin@coworking.com",
      password: await bcrypt.hash("Admin@1234", 12),
      verified: true,
      role: "admin",
    },
  ];

  for (const user of users) {
    console.log(`Insertando información de ${chalk.bgCyan(`${user.email}`)}`);
    await db.query(
      `INSERT INTO users (id, username, email, password, verified, role) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user.id,
        user.username,
        user.email,
        user.password,
        user.verified,
        user.role,
      ]
    );
  }
  console.log(chalk.bgGreen("Usuarios iniciales cargados!"));

  // Espacios iniciales para la carga de la base de datos
  console.log(chalk.bgBlue("Cargando salas iniciales!"));
  const rooms = [
    {
      id: crypto.randomUUID(),
      name: "Sócrates",
      description:
        "Espacio dedicado a reuniones y trabajos en grupo de hasta un máximo de 10 personas cuenta con el equipamiento necesario para el correcto desarrollo de las mismas",
      capacity: 10,
      typeOf: "Privada",
    },
    {
      id: crypto.randomUUID(),
      name: "Platón",
      description:
        "Espacio dedicado a reuniones y trabajos en grupo de hasta un máximo de 6 personas cuenta con el equipamiento necesario para el correcto desarrollo de las mismas",
      capacity: 6,
      typeOf: "Privada",
    },
    {
      id: crypto.randomUUID(),
      name: "Aristóteles",
      description:
        "Espacio común dedicado a trabajos en grupo con un aforo para 20 personas",
      capacity: 20,
      typeOf: "Pública",
    },
  ];

  for (const room of rooms) {
    console.log(`Insertando información de ${chalk.bgCyan(`${room.name}`)}`);
    await db.query(
      `INSERT INTO rooms (id, name, description, capacity, typeOf) VALUES (?, ?, ?, ?, ?)`,
      [room.id, room.name, room.description, room.capacity, room.typeOf]
    );
  }
  console.log(chalk.bgGreen("Salas iniciales cargados!"));
}
