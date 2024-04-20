import express from 'express';
import path from 'path';

const serveStatic = express.static(path.join(__dirname, 'public'));

export default serveStatic;