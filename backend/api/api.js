const express = require("express");
const apiRouter = express.Router();
const { playerRouter } = require("./PlayerRouter.js");

apiRouter.use("/players", playerRouter);

module.exports = apiRouter;
