import { getPool } from "../database/getPool.js";

const pool = getPool();

export async function validateUserId(req, res, next) {
    const { id: userId } = req.params;

    console.log(userId);
    const authenticatedUserId = req.userId;
    
    if (authenticatedUserId !== userId) {
        return res.status(403).json({
            success: false,
            message: "No tienes permiso para acceder a estos datos",
        });
    }
    try {
        const [userRows] = await pool.query(
            `SELECT * FROM users WHERE id = ?`,
            [userId]
        );
  
        if (userRows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }
  
        next();
    } catch (err) {
        next(err);
    }
  }