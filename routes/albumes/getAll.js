import { getAll as getAllAlbumes } from "../../data/albumes.js";

export const getAll = (req, res) => {
  const albumes = getAllAlbumes();
  res.status(200).json(albumes);
};
