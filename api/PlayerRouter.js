const express = require("express");
const playerRouter = express.Router();
const { albumsRouter } = require("./AlbumRouter");
const {
  findReqPlayer,
  getAllPlayers,
  searchByQueries,
  //getPlayersByGenre,
  getById,
  validatePlayer,
  postPlayer,
  getPlayerIdsFromGenre,
} = require("./PlayerService");

//Set req.player by playerId
playerRouter.param("playerId", findReqPlayer);

playerRouter.use("/:playerId/albums", albumsRouter);

//Get all players
playerRouter.get("/", getAllPlayers);
//Search players by queries
playerRouter.get("/search", getPlayerIdsFromGenre, searchByQueries);
//Get all players of one genre
//playerRouter.get("/genres", getPlayerIdsFromGenre, getPlayersByGenre);
//Get one player by id
playerRouter.get("/:playerId", getById);
//Post a new player
playerRouter.post("/", validatePlayer, postPlayer);

module.exports = { playerRouter };
