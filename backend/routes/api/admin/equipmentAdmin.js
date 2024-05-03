import  { Router } from "express";
import { getPool } from "../../../database/getPool.js";
import authenticate from "../../middleware/authenticateTokenUser.js";
import { validateEquipmentId } from "../../../validations/validateEquipmentId.js";
import { validateEquipmentEditRequest } from "../../../validations/validateEquipmentEdition.js";
import isAdmin from "../../middleware/isAdmin.js";

const dbPool = getPool();

export const equipmentAdminRouter = Router();

// agregar equipos solo admin
equipmentAdminRouter.post("/equipment/add", authenticate ,isAdmin, async (req, res, next) => {
    try {
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

//Update de equipos
equipmentAdminRouter.patch("/equipment/:equipmentId", authenticate, isAdmin, async (req, res, next) => {
        try {
          const equipmentId = req.params.equipmentId;
    
          
          const equipment = await validateEquipmentId(equipmentId);
          
          const { name, description, inventory } = validateEquipmentEditRequest(
              req.body
            );
            console.log(req.body);
      
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
          res.json({
            success: true,
            message: `Producto ${name} se actualizo correctamente`,
          });
        } catch (err) {
          next(err);
        }
  });

  // Borrar equipos
  equipmentAdminRouter.delete("/equipment/:equipmentId", authenticate , isAdmin,  async (req, res, next) => {
    try {
      const equipmentId = req.params.equipmentId;
  
      await dbPool.execute(`DELETE FROM equipment WHERE id=?`, [equipmentId]);
  
      res.json({
        success: true,
        message: `Producto borrado correctamente`,
        });
    } catch (err) {
      next(err);
    }
  });
  

//Busqueda de inventario de equipos
equipmentAdminRouter.get("/equipment/search", async (req, res, next) => {
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

  
      res.json({
        success: true,
        message: `${equipmentSearch.length} resultado`,
        data: equipmentSearch
    });
       
    } catch (err) {
      next(err);
    }
  });

  //Busqueda para enlistar equipos
equipmentAdminRouter.get("/equipment/searchlist", async (req, res, next) => {
    try {
      const search = req.query.search || '';
      const offset = req.query.offset || 0;
  
      const [equipment] = await dbPool.execute(
        `SELECT name FROM equipment
        WHERE name LIKE ? OR description LIKE ?
        ORDER BY name DESC
        LIMIT 10 OFFSET ${offset}`,
        [`%${search}%`, `%${search}%`]
      );

      const equipmentNames = equipment.map(item => item.name);
  
      res.json({
        success: true,
        message: equipmentNames
       
    });
       
    } catch (err) {
      next(err);
    }
  });

