import "dotenv/config";
import express from "express";
import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";
import { createAlbum } from "./routes/albumes/createAlbum.js";
import { updateAlbum } from "./routes/albumes/updateAlbum.js";
import { deleteAlbum } from "./routes/albumes/deleteAlbum.js";

const app = express();
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => res.json({
  nombre: "DiscoStore API",
  version: "1.0.0",
  descripcion: "API REST para gestión de catálogo de álbumes musicales.",
}));

app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);
app.post("/albumes", createAlbum);
app.put("/album/:slug", updateAlbum);
app.delete("/album/:slug", deleteAlbum);

app.use("/imagenes", express.static("imagenes"));

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore corriendo en http://${HOST}:${PORT}/`);
});
