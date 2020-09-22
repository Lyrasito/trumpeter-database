const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "heroku_112e3ed1fa6af0f",
  "bfb8b9b7f88147",
  "2ea010c0",
  {
    host: "us-cdbr-east-02.cleardb.com",
    dialect: "mysql",
  }
);

const Player = sequelize.define(
  "Player",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    start_year: { type: DataTypes.INTEGER },
    end_year: { type: DataTypes.INTEGER },
    image: { type: DataTypes.STRING },
  },
  { tableName: "player", timestamps: false }
);

const Album = sequelize.define(
  "Album",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING },
    year: { type: DataTypes.INTEGER },
    genre: { type: DataTypes.STRING },
    player_id: {
      type: DataTypes.INTEGER,
      references: { model: "player", key: "id" },
    },
    image: { type: DataTypes.STRING },
  },
  { tableName: "album", timestamps: false }
);

module.exports = { Album, Player };
