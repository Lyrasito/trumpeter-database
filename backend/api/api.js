const express = require("express");
const apiRouter = express.Router();
const { playerRouter } = require("./PlayerRouter.js");
const getSpotifyToken = require("../Spotify");

apiRouter.use("/players", playerRouter);

const getToken = async (req, res, next) => {
  const token = await getSpotifyToken();
  res.send({ token });
};

apiRouter.get("/token", getToken);
module.exports = apiRouter;
