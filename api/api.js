const express = require("express");
const apiRouter = express.Router();
const { playerRouter } = require("./PlayerRouter");

apiRouter.use("/players", playerRouter);

module.exports = apiRouter;
