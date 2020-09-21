const express = require("express");
const albumsRouter = express.Router({ mergeParams: true });

const {
  getAllAlbums,
  getAllGenres,
  getAlbumsOneGenre,
  validateAlbum,
  postAlbum,
} = require("./AlbumService");

//Get all albums by one Player
albumsRouter.get("/", getAllAlbums);
//get all genres from one Player
albumsRouter.get("/genres", getAllGenres);
//get all albums of one genre from one Player
albumsRouter.get("/genres/albums", getAlbumsOneGenre);
//Add an album
albumsRouter.post("/", validateAlbum, postAlbum);

module.exports = { albumsRouter };
