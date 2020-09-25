/*const { Sequelize, DataTypes } = require("sequelize");

const testDb = new Sequelize("test-trumpeter-database", "Marie", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
});

const TestPlayer = testDb.define(
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

const TestAlbum = testDb.define(
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

TestAlbum.sync();
TestPlayer.sync();

module.exports = { TestAlbum, TestPlayer, testDb };
*/
