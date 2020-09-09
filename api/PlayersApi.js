const express = require("express");
const playerRouter = express.Router();
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");
const albumsRouter = require("./Albums");

playerRouter.param("playerId", (req, res, next, playerId) => {
  db.get(`SELECT * FROM 'Player' WHERE id = ${playerId}`, (err, player) => {
    if (err) {
      next(err);
    } else {
      if (player) {
        req.player = player;
        next();
      } else {
        res.sendStatus(404);
      }
    }
  });
});

playerRouter.use("/:playerId/albums", albumsRouter);

//Get all players
playerRouter.get("/", (req, res, next) => {
  db.all("SELECT * FROM 'Player'", (err, players) => {
    if (err) {
      next(err);
    } else {
      res.send({ players: players });
    }
  });
});

//Search players by queries
playerRouter.get("/search", (req, res, next) => {
  console.log(req.query);
  if (req.query.city && !req.query.year && !req.query.genre) {
    db.all(
      `SELECT * FROM 'Player' WHERE city LIKE '%${req.query.city}%'`,
      (err, players) => {
        if (err) {
          next(err);
        } else {
          res.send({ players: players });
        }
      }
    );
  } else if (req.query.year && !req.query.city && !req.query.genre) {
    const numYear = Number(req.query.year);
    db.all(
      `SELECT * FROM 'Player' WHERE ${numYear} BETWEEN start_year AND end_year`,
      (err, players) => {
        if (err) {
          next(err);
        } else {
          res.send({ players: players });
        }
      }
    );
  } else if (req.query.name) {
    db.all(
      `SELECT * FROM 'Player' WHERE name LIKE '%${req.query.name}%'`,
      (err, players) => {
        if (err) {
          next(err);
        } else {
          res.send({ players: players });
        }
      }
    );
  } else if (req.query.genre && !req.query.city && !req.query.year) {
    db.all(
      `SELECT * FROM Album WHERE genre LIKE '%${req.query.genre}%'`,
      (err, albums) => {
        if (err) {
          next(err);
        } else {
          const ids = albums.map((data) => {
            return Number(data.player_id);
          });
          const stringIds = ids.join(",");
          console.log(typeof stringIds);
          const sql = `SELECT * FROM Player WHERE Player.id IN (${stringIds})`;
          db.all(sql, (err, players) => {
            if (err) {
              next(err);
            } else {
              res.send({ players: players });
            }
          });
        }
      }
    );
  } else if (req.query.city && req.query.year && !req.query.genre) {
    const numYear = Number(req.query.year);
    db.all(
      `SELECT * FROM 'Player' WHERE city LIKE '%${req.query.city}%' AND ${numYear} BETWEEN start_year AND end_year`,
      (err, players) => {
        if (err) {
          next(err);
        } else {
          res.send({ players: players });
        }
      }
    );
  } else if (req.query.city && req.query.genre && !req.query.year) {
    db.all(
      `SELECT * FROM Album WHERE genre LIKE '%${req.query.genre}%'`,
      (err, albums) => {
        if (err) {
          next(err);
        } else {
          const ids = albums.map((data) => {
            return Number(data.player_id);
          });
          const stringIds = ids.join(",");

          const sql = `SELECT * FROM Player WHERE Player.id IN (${stringIds}) AND Player.city LIKE '%${req.query.city}%'`;

          db.all(sql, (err, players) => {
            if (err) {
              next(err);
            } else {
              res.send({ players: players });
            }
          });
        }
      }
    );
  } else if (req.query.genre && req.query.year && !req.query.city) {
    const numYear = Number(req.query.year);
    db.all(
      `SELECT * FROM Album WHERE genre LIKE '%${req.query.genre}%'`,
      (err, albums) => {
        if (err) {
          next(err);
        } else {
          const ids = albums.map((data) => {
            return Number(data.player_id);
          });
          const stringIds = ids.join(",");

          const sql = `SELECT * FROM Player WHERE Player.id IN (${stringIds}) AND ${numYear} BETWEEN start_year AND end_year`;

          db.all(sql, (err, players) => {
            if (err) {
              next(err);
            } else {
              res.send({ players: players });
            }
          });
        }
      }
    );
  } else if (req.query.genre && req.query.year && req.query.city) {
    const numYear = Number(req.query.year);
    db.all(
      `SELECT * FROM Album WHERE genre LIKE '%${req.query.genre}%'`,
      (err, albums) => {
        if (err) {
          next(err);
        } else {
          const ids = albums.map((data) => {
            return Number(data.player_id);
          });
          const stringIds = ids.join(",");

          const sql = `SELECT * FROM Player WHERE Player.id IN (${stringIds}) AND ${numYear} BETWEEN start_year AND end_year AND Player.city LIKE '%${req.query.city}%'`;

          db.all(sql, (err, players) => {
            if (err) {
              next(err);
            } else {
              res.send({ players: players });
            }
          });
        }
      }
    );
  }
});

playerRouter.get("/genres", (req, res, next) => {
  db.all(
    "SELECT * FROM Album WHERE genre = $genre",
    { $genre: req.query.genre },
    (err, albums) => {
      if (err) {
        next(err);
      } else {
        const ids = albums.map((data) => {
          return Number(data.player_id);
        });
        const stringIds = ids.join(",");

        const sql = `SELECT * FROM Player WHERE Player.id IN (${stringIds})`;
        db.all(sql, (err, players) => {
          if (err) {
            next(err);
          } else {
            res.send({ players: players });
          }
        });
      }
    }
  );
});

//Get one player by id
playerRouter.get("/:playerId", (req, res, next) => {
  res.send({ player: req.player });
});

const validatePlayer = (req, res, next) => {
  const newPlayer = req.body.player;
  if (
    !newPlayer.name ||
    !newPlayer.city ||
    !newPlayer.startYear ||
    !newPlayer.endYear
  ) {
    res.sendStatus(400);
  } else {
    next();
  }
};

playerRouter.post("/", validatePlayer, (req, res, next) => {
  const newPlayer = req.body.player;
  db.run(
    "INSERT INTO 'Player' (name, city, start_year, end_year) VALUES ($name, $city, $startYear, $endYear)",
    {
      $name: newPlayer.name,
      $city: newPlayer.city,
      $startYear: newPlayer.startYear,
      $endYear: newPlayer.endYear,
    },
    function (err) {
      if (err) {
        next(err);
      } else {
        db.get(
          `SELECT * FROM 'Player' WHERE id = ${this.lastID}`,
          (err, player) => {
            res.status(201).send({ player: player });
          }
        );
      }
    }
  );
});

module.exports = playerRouter;
