import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const serveStatic = express.static(path.join(dirname, "..", "..", "..", "frontend", "public", "uploads"));

export default serveStatic;