import express from "express";
const apiRouter = express.Router();
import { playerRouter } from "./PlayerRouter.js";

apiRouter.use("/players", playerRouter);

export default apiRouter;
