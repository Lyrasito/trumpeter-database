const express = require("express");
const albumsRouter = express.Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

//Get all albums by one Player
albumsRouter.get("/", (req, res, next) => {
  db.all(
    `SELECT * FROM 'Album' WHERE Album.player_id = ${req.player.id}`,
    (err, albums) => {
      if (err) {
        next(err);
      } else {
        res.send({ albums: albums });
      }
    }
  );
});

module.exports = albumsRouter;
