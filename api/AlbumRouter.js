import express from "express";
const albumsRouter = express.Router({ mergeParams: true });

import {
  getAllAlbums,
  getAllGenres,
  getAlbumsOneGenre,
  validateAlbum,
  postAlbum,
} from "./AlbumService.js";

//Get all albums by one Player
albumsRouter.get("/", getAllAlbums);
//get all genres from one Player
albumsRouter.get("/genres", getAllGenres);
//get all albums of one genre from one Player
albumsRouter.get("/genres/albums", getAlbumsOneGenre);
//Add an album
albumsRouter.post("/", validateAlbum, postAlbum);

export { albumsRouter };
