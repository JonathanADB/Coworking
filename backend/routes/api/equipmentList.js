import { Router } from "express";
import { getPool } from "../../database/getPool.js";
import { validateEquipmentEditRequest } from "../../validations/validateEquipmentEdition.js";
import { validateEquipmentId } from "../../validations/validateEquipmentId.js";

const dbPool = getPool();

export const equipmentRouter = Router();

equipmentRouter.get("/equipment", async (req, res, next) => {
  try {
    const equipmentId = req.currentEquipment.id;

    const equipment = await dbPool.execute(
      `SELECT * FROM equipment WHERE id=?`,
      [equipmentId]
    );

    res.json(success({ equipment }));
  } catch (err) {
    next(err);
  }
});

equipmentRouter.get("/equipment/search", async (req, res, next) => {
  try {
    const search = req.query.search;
    const offset = req.query.offset || 0;

    const [equipmentSearch] = await dbPool.execute(
      `SELECT * FROM equipment
      WHERE name LIKE ? OR description LIKE ?
      ORDER BY name DESC
      LIMIT 10 OFFSET ${offset}`,
      [`%${search}%`, `%${search}%`]
    );

    res.json(success(equipmentSearch));
  } catch (err) {
    next(err);
  }
});

equipmentRouter.get("equipment/:equipmentId", async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId;

    const equipmentInfo = validateEquipmentId(equipmentId);

    res.json(success(equipmentInfo));
  } catch (err) {
    next(err);
  }
});

equipmentRouter.post("/equipment/add", async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, description, inventory } = req.body;

    await dbPool.execute(
      `INSERT INTO equipment(id, name, description, inventory) VALUES (?, ?, ?, ?)`,
      [crypto.randomUUID(), name, description, inventory]
    );

    res.json({
      success: true,
      message: `Producto ${name} se añadió correctamente`,
    });
  } catch (err) {
    next(err);
  }
});

equipmentRouter.delete("/equipment/:equipmentId", async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId;

    await dbPool.execute(`DELETE FROM equipment WHERE id=?`, [equipmentId]);

    res.json(success());
  } catch (err) {
    next(err);
  }
});

equipmentRouter.patch("/equipment/:equipmentId", async (req, res, next) => {
  try {
    const equipmentId = req.params.equipmentId;

    const equipment = await validateEquipmentId(equipmentId);

    const { name, description, inventory } = validateEquipmentEditRequest(
      req.body
    );

    await dbPool.execute(
      `UPDATE equipment SET name=?, description=?, inventory=?, updatedAt=CURRENT_TIME()
      WHERE id=?`,
      [
        name ? name : equipment.name,
        description ? description : equipment.description,
        inventory ? inventory : equipment.inventory,
        equipmentId,
      ]
    );
  } catch (err) {
    next(err);
  }
});
