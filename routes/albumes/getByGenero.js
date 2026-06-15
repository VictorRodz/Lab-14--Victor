import { getByGenero as getAlbumesByGenero } from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const { genero } = req.params;
  const albumes = getAlbumesByGenero(genero);
  res.status(200).json(albumes);
};
