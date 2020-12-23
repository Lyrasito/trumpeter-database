const { Album } = require("../Models.js");
const getSpotifyToken = require("../Spotify");

const getAllAlbums = async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id },
    order: [["year", "ASC"]],
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  res.send({ albums: albumList });
};

const getAllGenres = async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id },
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  const genreList = albumList.map((album) => {
    return album.genre;
  });
  const uniqueArray = genreList.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });
  res.send({ genre: uniqueArray });
};

const getAlbumsOneGenre = async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id, genre: req.query.genre },
    order: [["year", "ASC"]],
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  res.send({ albums: albumList });
};

const validateAlbum = (req, res, next) => {
  const newAlbum = req.body.album;
  newAlbum.playerId = req.player.id;
  if (!newAlbum.title || !newAlbum.year || !newAlbum.genre) {
    res.status(400).send("Please fill out all fields");
  } else if (isNaN(newAlbum.year)) {
    res.status(400).send("Please enter a number in the Year field");
  } else if (!newAlbum.playerId) {
    res.status(400).send("Please select a player");
  } else {
    next();
  }
};

const postAlbum = async (req, res, next) => {
  const newAlbum = req.body.album;
  const createdAlbum = await Album.create({
    title: newAlbum.title,
    year: newAlbum.year,
    genre: newAlbum.genre,
    player_id: req.player.id,
  });
  res.status(201).send({ album: createdAlbum });
};

module.exports = {
  getAllAlbums,
  getAllGenres,
  getAlbumsOneGenre,
  validateAlbum,
  postAlbum,
};
