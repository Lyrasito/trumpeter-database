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
      const response = await request.get("/");
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("name");
    });
  });
  context("getById", () => {
    it("should get one player by Id", async () => {
      const response = await request.get("/1");
      expect(response.status).to.equal(200);
    });
  });
});
