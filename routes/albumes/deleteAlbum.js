import { getBySlug, remove } from "../../data/albumes.js";

export const deleteAlbum = (req, res) => {
  const { slug } = req.params;
  const existe = getBySlug(slug);
  if (!existe) return res.status(404).json({ error: "Álbum no encontrado." });
  remove(slug);
  res.status(204).send();
};
