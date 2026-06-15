import { z } from "zod";
import { create, slugExists } from "../../data/albumes.js";

const albumSchema = z.object({
  titulo: z.string().min(1),
  artista: z.string().min(1),
  genero: z.string().min(1),
  anio: z.number().int().min(1900).max(new Date().getFullYear()),
  sello: z.string().min(1),
  pistas: z.number().int().min(1),
  imagen: z.string().min(1),
  slug: z.string().min(1),
  resumen: z.string().min(1),
  descripcion: z.string().min(1),
});

export const createAlbum = (req, res) => {
  const result = albumSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Datos inválidos.", detalles: result.error.errors });
  }
  const existe = slugExists(result.data.slug);
  if (existe) {
    return res.status(409).json({ error: "Ya existe un álbum con ese slug." });
  }
  create(result.data);
  res.setHeader("Location", `/album/${result.data.slug}`);
  res.status(201).json({ mensaje: "Álbum creado con éxito.", slug: result.data.slug });
};
