import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;

export async function getUser(token) {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded;
}
