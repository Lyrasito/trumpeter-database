//process.env.PORT = 8081;
const rewire = require("rewire");
var app = rewire("../server");
const supertest = require("supertest");
const { playerRouter } = require("./PlayerRouter");
const request = supertest(app);
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
var sandbox = sinon.createSandbox();

const { Album, Player, sequelize } = require("../Models");

describe("PlayerRouter", () => {
  let newPlayer, newAlbum;
  before(async () => {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await Album.sync({ force: true });
    await Player.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
  });
  beforeEach(async () => {
    newPlayer = await Player.create({
      name: "Fake Player",
      city: "Fake City",
      start_year: 1234,
      end_year: 5678,
      image: "./FakePlayer.jpg",
    });
    newAlbum = await Album.create({
      title: "Fake Album",
      year: 1234,
      player_id: newPlayer.id,
      genre: "Fake Genre",
      image: "./FakeAlbum.jpg",
    });
  });
  afterEach(async () => {
    await newAlbum.destroy();
    await newPlayer.destroy();
  });
  context("getAllPlayers", () => {
    it("should get all players", async () => {
      const response = await request.get("/api/players");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("players");
    });
  });
  context("getById", () => {
    it("should get one player by Id", async () => {
      const response = await request.get("/api/players/" + newPlayer.id);
      expect(response.status).to.equal(200);
      expect(response.body)
        .to.have.property("player")
        .to.have.property("name")
        .to.equal("Fake Player");
    });
    it("should return 404 with invalid Id", async () => {
      const response = await request.get("/api/players/999");
      expect(response.status).to.equal(404);
    });
  });
  context("searchByQueries", () => {
    it("should get players by a city search", async () => {
      const cityResponse = await request.get("/api/players/search?city=Fake");
      expect(cityResponse.status).to.equal(200);
      expect(cityResponse.body).to.have.property("players");
      const cityPlayersArray = cityResponse.body.players;
      for (let i = 0; i < cityPlayersArray.length; i++) {
        expect(cityPlayersArray[i]).to.have.property("city").to.include("Fake");
      }
    });
    it("should get a list of players from a year search", async () => {
      const yearResponse = await request.get("/api/players/search?year=1940");
      expect(yearResponse.status).to.equal(200);
      expect(yearResponse.body).to.have.property("players");
      const yearPlayersArray = yearResponse.body.players;
      for (let i = 0; i < yearPlayersArray.length; i++) {
        expect(yearPlayersArray[i])
          .to.have.property("start_year")
          .to.be.below(1940);
        expect(yearPlayersArray[i])
          .to.have.property("end_year")
          .to.be.above(1940);
      }
    });
    it("should get a list of players from a genre search", async () => {
      const genreResponse = await request.get("/api/players/search?genre=Fake");
      expect(genreResponse.status).to.equal(200);
      expect(genreResponse.body).to.have.property("players");
      expect(genreResponse.body.players[0].id).to.equal(newPlayer.id);
    });
  });
  context("createPlayer", () => {
    it("should create a new player", async () => {
      const newPlayer = await request.post("/api/players").send({
        player: {
          name: "Fake Player",
          city: "Fake City",
          startYear: 1234,
          endYear: 5678,
          image: "./FakePlayer.jpg",
        },
      });
      expect(newPlayer.status).to.equal(201);
    });
  });
});
