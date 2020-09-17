const express = require("express");
const albumsRouter = express.Router({ mergeParams: true });
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

//Get all albums by one Player
albumsRouter.get("/", (req, res, next) => {
  db.all(
    `SELECT * FROM 'Album' WHERE Album.player_id = ${req.player.id} ORDER BY year`,
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
//Add an album
const validateAlbum = (req, res, next) => {
  const newAlbum = req.body.album;
  if (!newAlbum.title || !newAlbum.year || !newAlbum.genre) {
    res.sendStatus(400);
  } else {
    next();
  }
};

albumsRouter.post("/", validateAlbum, (req, res, next) => {
  const newAlbum = req.body.album;
  const sql = `INSERT INTO 'Album' (title, year, genre, player_id) VALUES ("${newAlbum.title}", ${newAlbum.year}, "${newAlbum.genre}", ${req.player.id})`;
  console.log(sql);
  db.run(sql, function (err) {
    if (err) {
      next(err);
    } else {
      db.get(
        `SELECT * FROM 'Album' WHERE Album.id = ${this.lastID}`,
        (err, album) => {
          res.status(201).send({ album: album });
        }
      );
    }
  });
});
module.exports = albumsRouter;
