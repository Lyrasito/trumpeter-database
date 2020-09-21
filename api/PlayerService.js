const { Op } = require("sequelize");
const { Player, Album } = require("../Models");

const findReqPlayer = async (req, res, next, playerId) => {
  const foundPlayer = await Player.findByPk(playerId);
  if (foundPlayer) {
    req.player = foundPlayer;
    next();
  } else {
    res.status(404).send("Please select a player");
  }
};

//Middleware to get player ids from genre
const getPlayerIdsFromGenre = async (req, res, next) => {
  const foundAlbums = await Album.findAll({
    where: { genre: { [Op.like]: `%${req.query.genre}%` } },
  });
  req.playerIds = foundAlbums.map((album) => album.player_id);
  next();
};

const getAllPlayers = async (req, res, next) => {
  const foundPlayers = await Player.findAll({ order: [["name", "ASC"]] });
  const playerList = foundPlayers.map((player) => player.toJSON());
  res.send({ players: playerList });
};

const searchByQueries = async (req, res, next) => {
  const numYear = Number(req.query.year);

  if (req.query.city && !req.query.year && !req.query.genre) {
    const foundPlayers = await Player.findAll({
      where: { city: { [Op.like]: `%${req.query.city}%` } },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.year && !req.query.city && !req.query.genre) {
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
    const foundPlayers = await Player.findAll({ where: { id: req.playerIds } });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.city && req.query.year && !req.query.genre) {
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
    const foundPlayers = await Player.findAll({
      where: { id: req.playerIds },
      city: { [Op.like]: `%${req.query.city}%` },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.genre && req.query.year && !req.query.city) {
    const foundPlayers = await Player.findAll({
      where: {
        id: req.playerIds,
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  } else if (req.query.genre && req.query.year && req.query.city) {
    const foundPlayers = await Player.findAll({
      where: {
        id: req.playerIds,
        start_year: { [Op.lte]: numYear },
        end_year: { [Op.gte]: numYear },
        city: { [Op.like]: `%${req.query.city}%` },
      },
    });
    const playerList = foundPlayers.map((player) => player.toJSON());
    res.send({ players: playerList });
  }
};

const getPlayersByGenre = async (req, res, next) => {
  const foundPlayers = await Player.findAll({ where: { id: req.playerIds } });
  const playerList = foundPlayers.map((player) => player.toJSON());
  res.send({ players: playerList });
};

const getById = (req, res, next) => {
  res.send({ player: req.player });
};

const validatePlayer = (req, res, next) => {
  const newPlayer = req.body.player;
  if (
    !newPlayer.name ||
    !newPlayer.city ||
    !newPlayer.startYear ||
    !newPlayer.endYear
  ) {
    res.status(400).send("Please fill out all fields");
  } else if (isNaN(newPlayer.startYear) || isNaN(newPlayer.endYear)) {
    res.status(400).send("Please enter a number in the Year fields");
  } else {
    next();
  }
};

const postPlayer = async (req, res, next) => {
  const newPlayer = req.body.player;
  const createdPlayer = await Player.create({
    name: newPlayer.name,
    city: newPlayer.city,
    start_year: newPlayer.startYear,
    end_year: newPlayer.endYear,
  });
  res.status(201).send({ player: createdPlayer });
};

module.exports = {
  findReqPlayer,
  getAllPlayers,
  searchByQueries,
  getPlayersByGenre,
  getById,
  validatePlayer,
  postPlayer,
  getPlayerIdsFromGenre,
};
