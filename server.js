import bodyParser from "body-parser";
import cors from "cors";
import errorhandler from "errorhandler";
import express from "express";
import morgan from "morgan";
import apiRouter from "./api/api.js";
const isHeroku = process.env.HEROKU;

const app = express();
app.use(bodyParser.json());

app.use(cors());
app.use(errorhandler());
app.use(morgan("dev"));
app.use("/api", apiRouter);

if (isHeroku) {
  app.use(express.static("build"));
} else {
  app.use(express.static("public"));
}

exports.server = app;
