import { createCanvas } from "canvas";
import fs from "fs";

// Crear lienzo 200x150
const width = 200;
const height = 150;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

// Fondo gris
ctx.fillStyle = "#cccccc";
ctx.fillRect(0, 0, width, height);

// Texto "Producto"
ctx.fillStyle = "#333333";
ctx.font = "bold 20px Arial";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Producto", width / 2, height / 2);

// Guardar como PNG
const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("./frontend/public/default-product.png", buffer);

console.log("✅ Imagen placeholder creada en frontend/public/default-product.png");