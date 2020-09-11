const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./database.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS `Player` (" +
    "`id` INTEGER NOT NULL, " +
    "`name` TEXT NOT NULL, " +
    "`city` TEXT NOT NULL, " +
    "`start_year` INTEGER NOT NULL, " +
    "`end_year` INTEGER NOT NULL, " +
    "`image` TEXT, " +
    "PRIMARY KEY(`id`) )"
);

db.run(
  "CREATE TABLE IF NOT EXISTS `Album` (" +
    "`id` INTEGER NOT NULL, " +
    "`title` TEXT NOT NULL, " +
    "`year` INTEGER NOT NULL, " +
    "`genre` TEXT NOT NULL, " +
    "`player_id` INTEGER NOT NULL, " +
    "PRIMARY KEY(`id`), " +
    "FOREIGN KEY (`player_id`) REFERENCES `Player`(`id`))"
);
