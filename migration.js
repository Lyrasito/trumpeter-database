const mySQL = require("mysql");
const { Player } = require("./api/PlayersApi");
const { Album } = require("./api/AlbumsApi");

Player.sync();
Album.sync();

/*
const db = mySQL.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "Marie",
  password: "password",
  database: "trumpeter-database",
});

db.query(
  "CREATE TABLE IF NOT EXISTS `Player` (" +
    "`id` INTEGER NOT NULL, " +
    "`name` TEXT NOT NULL, " +
    "`city` TEXT NOT NULL, " +
    "`start_year` INTEGER NOT NULL, " +
    "`end_year` INTEGER NOT NULL, " +
    "`image` TEXT, " +
    "PRIMARY KEY(`id`) )"
);

db.query(
  "CREATE TABLE IF NOT EXISTS `Album` (" +
    "`id` INTEGER NOT NULL, " +
    "`title` TEXT NOT NULL, " +
    "`year` INTEGER NOT NULL, " +
    "`genre` TEXT NOT NULL, " +
    "`player_id` INTEGER NOT NULL, " +
    "`image` TEXT, " +
    "PRIMARY KEY(`id`), " +
    "FOREIGN KEY (`player_id`) REFERENCES `Player`(`id`))"
);
*/
