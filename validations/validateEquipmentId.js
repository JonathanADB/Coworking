import { getPool } from "../database/getPool.js";

const dbPool = getPool();

export async function validateEquipmentId(equipmentId) {
  const [[equipment]] = await dbPool.execute(
    `SELECT * FROM equipment WHERE id=?`,
    [equipmentId]
  );
  if (!equipment) {
    throw Error("Artículo no encontrado");
  }
}
