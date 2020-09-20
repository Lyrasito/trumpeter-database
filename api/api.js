const express = require("express");
const apiRouter = express.Router();
const { playerRouter } = require("./PlayersApi");

apiRouter.use("/players", playerRouter);

module.exports = apiRouter;
