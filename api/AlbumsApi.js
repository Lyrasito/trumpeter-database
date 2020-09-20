const express = require("express");
const albumsRouter = express.Router({ mergeParams: true });
const mySQL = require("mysql");
const { Sequelize, DataTypes, Op } = require("sequelize");

const db = mySQL.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "Marie",
  password: "password",
  database: "trumpeter-database",
});

const sequelize = new Sequelize("trumpeter-database", "Marie", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const Album = sequelize.define(
  "Album",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    genre: { type: DataTypes.STRING },
    player_id: {
      type: DataTypes.INTEGER,
      references: { model: "player", key: "id" },
    },
    image: { type: DataTypes.STRING },
  },
  { tableName: "album", timestamps: false }
);

//Get all albums by one Player
albumsRouter.get("/", async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id },
    order: [["year", "ASC"]],
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  res.send({ albums: albumList });
});

//get all genres from one Player
albumsRouter.get("/genres", async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id },
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  const genreList = albumList.map((album) => {
    return album.genre;
  });
  uniqueArray = genreList.filter(function (item, pos, self) {
    return self.indexOf(item) == pos;
  });
  res.send({ genre: uniqueArray });
});

//get all albums of one genre from one Player
albumsRouter.get("/genres/albums", async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { player_id: req.player.id, genre: req.query.genre },
    order: [["year", "ASC"]],
  });
  const albumList = foundAlbums.map((album) => album.toJSON());
  res.send({ albums: albumList });
});

//Add an album
const validateAlbum = (req, res, next) => {
  const newAlbum = req.body.album;
  if (!newAlbum.title || !newAlbum.year || !newAlbum.genre) {
    res.sendStatus(400);
  } else {
    next();
  }
};

albumsRouter.post("/", validateAlbum, async (req, res, next) => {
  const newAlbum = req.body.album;
  const createdAlbum = await Album.create({
    title: newAlbum.title,
    year: newAlbum.year,
    genre: newAlbum.genre,
    player_id: req.player.id,
  });
  res.status(201).send({ album: createdAlbum });
});
module.exports = { albumsRouter, Album };
