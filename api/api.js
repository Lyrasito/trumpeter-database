const express = require("express");
const apiRouter = express.Router();
const playerRouter = require("./Players");

apiRouter.use("/players", playerRouter);

module.exports = apiRouter;
