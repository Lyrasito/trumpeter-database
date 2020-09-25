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

//const { TestAlbum, TestPlayer, testDb } = require("./testseed");

describe("PlayerRouter", () => {
  const fakePlayer = {
    name: "Fake Player",
    city: "Fake City",
    start_year: 1234,
    end_year: 5678,
    image: "./FakePlayer.jpg",
  };
  const fakeAlbum = {
    title: "Fake Album",
    year: 1234,
    player_id: 1,
    genre: "Fake Genre",
    image: "./FakeAlbum.jpg",
  };
  before(() => {});
  /*beforeEach(async () => {
    //sandbox.stub(sequelize.Model, "create").resolves(fakePlayer);
    await TestPlayer.create({
      name: "Fake Player",
      city: "Fake City",
      start_year: 1234,
      end_year: 5678,
      image: "./FakePlayer.jpg",
    });
    await TestAlbum.create({
      title: "Fake Album",
      year: 1234,
      player_id: 1,
      genre: "Fake Genre",
      image: "./FakeAlbum.jpg",
    });
  });
  afterEach(async () => {
    await TestAlbum.destroy({ where: { id: 1 } });
    await TestPlayer.destroy({ where: { id: 1 } });

    sandbox.restore();
  }); */
  context("getAllPlayers", () => {
    it("should get all players", async () => {
      const response = await request.get("/api/players");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("players");
    });
  });
  context("getById", () => {
    it("should get one player by Id", async () => {
      const response = await request.get("/api/players/1");
      expect(response.status).to.equal(200);
      expect(response.body)
        .to.have.property("player")
        .to.have.property("name")
        .to.equal("Miles Davis");
    });
    it("should return 404 with invalid Id", async () => {
      const response = await request.get("/api/players/999");
      expect(response.status).to.equal(404);
    });
  });
  context("searchByQueries", () => {
    it("should get players by city, year, or genre", async () => {
      const cityResponse = await request.get("/api/players/search?city=York");
      expect(cityResponse.status).to.equal(200);
      expect(cityResponse.body).to.have.property("players");
      const cityPlayersArray = cityResponse.body.players;
      for (let i = 0; i < cityPlayersArray.length; i++) {
        expect(cityPlayersArray[i]).to.have.property("city").to.include("York");
      }

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

      const genreResponse = await request.get("/api/players/search?genre=cool");
      expect(genreResponse.status).to.equal(200);
      expect(genreResponse.body).to.have.property("players");
      //console.log(genreResponse.body);
      /*const genrePlayersArray = genreResponse.body.players;
      for(let i = 0; i < genrePlayersArray.length; i++) {
          expect(genrePlayersArray[i]).to.have.proper
      } */
    });
  });
  context("createPlayer", () => {
    it("should create a new player", async () => {
      const newPlayer = await request.post("/api/players").send({
        name: "Fake Player",
        city: "Fake City",
        start_year: 1234,
        end_year: 5678,
        image: "./FakePlayer.jpg",
      });
      expect(newPlayer.status).to.be(201);
    });
  });
});
