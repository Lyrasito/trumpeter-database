//process.env.PORT = 8081;
const rewire = require("rewire");
var app = rewire("../server");
const supertest = require("supertest");
const { playerRouter } = require("../api/PlayerRouter");
const request = supertest(app);
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

var sandbox = sinon.createSandbox();
const {
  findReqPlayer,
  getPlayerIdsFromGenre,
} = require("../api/PlayerService");
const { mockReq, mockRes } = require("sinon-express-mock");

const { Album, Player, sequelize } = require("../Models");

chai.use(sinonChai);

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
  after(async () => {});
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
    it("should get a player from a name search", async () => {
      const nameResponse = await request.get("/api/players/search?name=Fake");
      expect(nameResponse.status).to.equal(200);
      expect(nameResponse.body).to.have.property("players");
      expect(nameResponse.body.players[0])
        .to.have.property("name")
        .to.include("Fake");
    });
    it("should get a list of players from a city/year/genre search", async () => {
      const newPlayer2 = await Player.create({
        name: "Fake Name1",
        city: "Mock City",
        start_year: 1234,
        end_year: 5678,
      });
      const newAlbum2 = await Album.create({
        title: "Fake Album2",
        year: 1234,
        genre: "Fake Genre",
        player_id: newPlayer2.id,
      });
      const response = await request.get(
        "/api/players/search?city=Mock&year=2345&genre=Fake"
      );
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("players");
      const searchPlayersArray = response.body.players;
      searchPlayersArray.forEach((player) => {
        expect(player).to.have.property("city").to.include("Mock");
        expect(player).to.have.property("city").to.not.include("Fake");
      });
      await newAlbum2.destroy();
      await newPlayer2.destroy();
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
    it("should send an error with insufficient input", async () => {
      const newPlayer = await request
        .post("/api/players")
        .send({ player: { name: "Fake" } });
      expect(newPlayer.status).to.equal(400);
      expect(newPlayer.error.text).to.equal("Please fill out all fields");
    });
    it("should send an error with invalid input", async () => {
      const newPlayer = await request.post("/api/players").send({
        player: {
          name: "Fake Name",
          city: "Fake City",
          startYear: "not number",
          endYear: 5678,
        },
      });
      expect(newPlayer.status).to.equal(400);
      expect(newPlayer.error.text).to.equal(
        "Please enter a number in the Year fields"
      );
    });
  });

  context("findReqPlayer", () => {
    it("should put player on req object", async () => {
      const req = mockReq();
      const res = mockRes();
      await findReqPlayer(req, res, () => {}, newPlayer.id);
      expect(req).to.have.property("player");
    });
    it("should throw error with invalid id", async () => {
      const res = mockRes();
      const req = mockReq();
      await findReqPlayer(req, res, () => {}, 999);
      expect(res.status).to.be.calledWith(404);
      expect(res.send).to.be.calledWith("Please select a player");
    });
  });
  context("getPlayerIdsFromGenre", () => {
    it("should set req.playerIds", async () => {
      const req = mockReq({ query: { genre: "Fake" } });
      const res = mockRes();
      await getPlayerIdsFromGenre(req, res, () => {});
      expect(req).to.have.property("playerIds");
      expect(req.playerIds).to.include(newPlayer.id);
    });
  });
});
