import { getPool } from "../database/getPool.js";

const pool = getPool();

export async function validateReviewId(reviewId) {
  // Comprobamos y validamos si existe una review
  const [[review]] = await pool.execute("SELECT * FROM reviews WHERE id = ?", [
    reviewId,
  ]);
  if (!review) {
    throw new Error("Review not found");
  }
  return review;
}
