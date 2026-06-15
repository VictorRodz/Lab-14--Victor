import { search as searchAlbumes } from "../../data/albumes.js";

export const search = (req, res) => {
  const { text } = req.params;
  const resultados = searchAlbumes(text);
  res.status(200).json(resultados);
};
