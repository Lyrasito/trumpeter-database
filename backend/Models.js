const pkg = require("sequelize");
const { Sequelize, DataTypes } = pkg;

const isHeroku = process.env.HEROKU;
const isTesting = process.env.TESTING;
const dotenv = require("dotenv");

dotenv.config({ path: isTesting ? ".test.env" : ".env" });

console.log(process.env.DATABASE_PASSWORD);
let sequelize;
if (isHeroku) {
  sequelize = new Sequelize(
    process.env.DATABASE_DATABASE,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_URL,
      dialect: "mysql",
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.DATABASE_DATABASE,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    {
      host: "127.0.0.1",
      dialect: "mysql",
    }
  );
}
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

Player.hasMany(Album, { foreignKey: "player_id" });
Album.belongsTo(Player, { foreignKey: "player_id" });

module.exports = { Album, Player, sequelize };
