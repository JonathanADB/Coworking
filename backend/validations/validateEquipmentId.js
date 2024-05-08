import { getPool } from "../database/getPool.js";
import { createError } from "../utils/error.js";

const dbPool = getPool();

export async function validateEquipmentId(equipmentId) {
  const [[equipment]] = await dbPool.execute(
    `SELECT * FROM equipment WHERE id=?`,
    [equipmentId]
  );
  if (!equipment) {
    throw createError(404, "Artículo no encontrado");
  }
}
