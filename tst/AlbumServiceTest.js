import rewire from "rewire";
var app = rewire("../server");
const supertest = require("supertest");
const request = supertest(app);
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { mockReq, mockRes } = require("sinon-express-mock");

const { Album, Player, sequelize } = require("../Models");

chai.use(sinonChai);

describe("AlbumRouter", () => {
  before(async () => {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await Player.sync({ force: true });
    await Album.sync({ force: true });
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
  context("getAllAlbums", () => {
    it("should get a list of all albums by one player", async () => {
      const response = await request.get(`/api/players/${newPlayer.id}/albums`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("albums");
      const albumsArray = response.body.albums;
      albumsArray.forEach((album) =>
        expect(album).to.have.property("id").to.equal(newPlayer.id)
      );
    });
  });
  context("getAllGenres", () => {
    it("should get a list of genres for one player", async () => {
      const response = await request.get(
        `/api/players/${newPlayer.id}/albums/genres`
      );
      expect(response.status).to.equal(200);
      //console.log(response);
      expect(response.body).to.have.property("genre");
      const genresArray = response.body.genre;
      expect(genresArray).to.include("Fake Genre");
    });
  });
  context("getAlbumsOneGenre", () => {
    it("should get a list of albums of one genre by one player", async () => {
      const newAlbum2 = await Album.create({
        title: "Mock Album",
        year: 1234,
        genre: "Mock genre",
        player_id: newPlayer.id,
      });
      const response = await request.get(
        `/api/players/${newPlayer.id}/albums/genres/albums?genre=${newAlbum2.genre}`
      );
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("albums");
      const albumsArray = response.body.albums;
      albumsArray.forEach((album) => {
        expect(album.id).to.equal(newAlbum2.id);
        expect(album.id).to.not.equal(newAlbum.id);
      });
      await newAlbum2.destroy();
    });
  });
  context("createAlbum", () => {
    it("should create a new album", async () => {
      const newAlbum2 = await request
        .post(`/api/players/${newPlayer.id}/albums`)
        .send({
          album: { title: "Mock Album", year: 1234, genre: "Mock genre" },
        });

      expect(newAlbum2.status).to.equal(201);
      expect(newAlbum2.body).to.have.property("album");
      expect(newAlbum2.body.album)
        .to.have.property("player_id")
        .to.equal(newPlayer.id);

      await Album.destroy({ where: { player_id: newPlayer.id } });
      //console.log(newAlbum2);
    });
    it("should throw an error with insufficient input", async () => {
      const newAlbum2 = await request
        .post(`/api/players/${newPlayer.id}/albums`)
        .send({ album: { title: "Mock Album" } });
      expect(newAlbum2.status).to.equal(400);
      expect(newAlbum2.error.text).to.equal("Please fill out all fields");
    });
    it("should throw an error with invalid input", async () => {
      const newAlbum2 = await request
        .post(`/api/players/${newPlayer.id}/albums`)
        .send({
          album: {
            title: "Mock Album",
            year: "not a number",
            genre: "Mock genre",
          },
        });
      expect(newAlbum2.status).to.equal(400);
      expect(newAlbum2.error.text).to.equal(
        "Please enter a number in the Year field"
      );
    });
  });
});
