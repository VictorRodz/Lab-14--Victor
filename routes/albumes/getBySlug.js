import { getBySlug as getAlbumBySlug } from "../../data/albumes.js";

export const getBySlug = (req, res) => {
  const { slug } = req.params;
  const album = getAlbumBySlug(slug);
  if (!album) return res.status(404).json({ error: "Álbum no encontrado." });
  res.status(200).json(album);
};
