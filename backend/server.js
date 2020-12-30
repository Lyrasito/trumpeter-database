const bodyParser = require("body-parser");
const cors = require("cors");
const errorhandler = require("errorhandler");
const express = require("express");
const morgan = require("morgan");
const apiRouter = require("./api/api.js");
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

<<<<<<< HEAD:backend/server.js
module.exports = app;
=======
exports.server = app;
>>>>>>> a953ade86d58d8ef9bab9863012f9db09fa17b87:server.js
