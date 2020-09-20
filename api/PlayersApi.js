const express = require("express");
const playerRouter = express.Router();
const { albumsRouter } = require("./AlbumsApi");
const { Op } = require("sequelize");
const { Player, Album } = require("../Models");

playerRouter.param("playerId", async (req, res, next, playerId) => {
  const foundPlayer = await Player.findByPk(playerId);
  if (foundPlayer) {
    req.player = foundPlayer;
    next();
  } else {
    res.sendStatus(404);
  }
});

playerRouter.use("/:playerId/albums", albumsRouter);

//Get all players
playerRouter.get("/", async (req, res, next) => {
  const foundPlayers = await Player.findAll({ order: [["name", "ASC"]] });
  const playerList = foundPlayers.map((player) => player.toJSON());
  res.send({ players: playerList });
});

//Search players by queries
playerRouter.get("/search", async (req, res, next) => {
  console.log(req.query);
  if (req.query.city && !req.query.year && !req.query.genre) {
    const foundPlayers = await Player.findAll({
      where: { city: { [Op.like]: `%${req.query.city}%` } },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.year && !req.query.city && !req.query.genre) {
    const numYear = Number(req.query.year);
    const foundPlayers = await Player.findAll({
      where: {
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.name) {
    const foundPlayers = await Player.findAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.genre && !req.query.city && !req.query.year) {
    const foundAlbums = await Album.findAll({
      where: { genre: { [Op.like]: `%${req.query.genre}%` } },
    });
    const playerIds = foundAlbums.map((album) => album.player_id);
    const foundPlayers = await Player.findAll({ where: { id: playerIds } });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.city && req.query.year && !req.query.genre) {
    const numYear = Number(req.query.year);
    const foundPlayers = await Player.findAll({
      where: {
        city: { [Op.like]: `%${req.query.city}%` },
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.city && req.query.genre && !req.query.year) {
    const foundAlbums = await Album.findAll({
      where: { genre: { [Op.like]: `%${req.query.genre}%` } },
    });
    const playerIds = foundAlbums.map((album) => album.player_id);
    const foundPlayers = await Player.findAll({
      where: { id: playerIds },
      city: { [Op.like]: `%${req.query.city}%` },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.genre && req.query.year && !req.query.city) {
    const numYear = Number(req.query.year);
    const foundAlbums = await Album.findAll({
      where: { genre: { [Op.like]: `%${req.query.genre}%` } },
    });
    const playerIds = foundAlbums.map((album) => album.player_id);
    const foundPlayers = await Player.findAll({
      where: {
        id: playerIds,
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.genre && req.query.year && req.query.city) {
    const numYear = Number(req.query.year);
    const foundAlbums = await Album.findAll({
      where: { genre: { [Op.like]: `%${req.query.genre}%` } },
    });
    const playerIds = foundAlbums.map((album) => album.player_id);
    const foundPlayers = await Player.findAll({
      where: {
        id: playerIds,
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
        city: { [Op.like]: `%${req.query.city}%` },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  }
});

playerRouter.get("/genres", async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { genre: req.query.genre },
  });
  const playerIds = foundAlbums.map((album) => album.player_id);
  const foundPlayers = await Player.findAll({ where: { id: playerIds } });
  const playerList = foundPlayers.map((player) => player.toJSON());
  res.send({ players: playerList });
});

//Get one player by id
playerRouter.get("/:playerId", (req, res, next) => {
  res.send({ player: req.player });
});

const validatePlayer = (req, res, next) => {
  const newPlayer = req.body.player;
  if (
    !newPlayer.name ||
    !newPlayer.city ||
    !newPlayer.startYear ||
    !newPlayer.endYear
  ) {
    res.sendStatus(400);
  } else {
    next();
  }
};

playerRouter.post("/", validatePlayer, async (req, res, next) => {
  const newPlayer = req.body.player;
  const createdPlayer = await Player.create({
    name: newPlayer.name,
    city: newPlayer.city,
    start_year: newPlayer.startYear,
    end_year: newPlayer.endYear,
  });
  res.status(201).send({ player: createdPlayer });
});

module.exports = { playerRouter };
