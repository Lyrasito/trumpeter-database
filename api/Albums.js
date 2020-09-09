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
//get all genres from one Player
albumsRouter.get("/genres", (req, res, next) => {
  db.all(
    `SELECT * FROM 'Album' WHERE Album.player_id = ${req.player.id}`,
    (err, albums) => {
      if (err) {
        next(err);
      } else {
        const genres = albums.map((album) => {
          return album.genre;
        });
        uniqueArray = genres.filter(function (item, pos, self) {
          return self.indexOf(item) == pos;
        });
        res.send({ genre: uniqueArray });
      }
    }
  );
});

module.exports = albumsRouter;
