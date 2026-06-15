import { z } from "zod";
import { getBySlug, update } from "../../data/albumes.js";

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

export const updateAlbum = (req, res) => {
  const { slug } = req.params;
  const existe = getBySlug(slug);
  if (!existe) return res.status(404).json({ error: "Álbum no encontrado." });

  const result = albumSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: "Datos inválidos.", detalles: result.error.errors });
  }
  update(slug, result.data);
  res.status(200).json({ mensaje: "Álbum actualizado con éxito." });
};
