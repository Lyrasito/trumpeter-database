import { Album, Player } from "./Models.js";
import Spotify from "./src/Spotify.js";
import request from "request";
import fs from "fs";

//written by Kevin
const getAlbums = async () => {
  let albumsArray = await Album.findAll({ include: Player });
  for (let album of albumsArray) {
    console.log("processing", album.title);
    await wait(1000);

    try {
      const spotifyAlbum = await Spotify.getAlbum(
        album.title + " " + album.Player.name
      );
      const imageUrl = spotifyAlbum.images[0].url;

      let safeTitle = album.title.replace("/", "");
      safeTitle = safeTitle.replace("?", "");
      await downloadAndSave(imageUrl, `./public/img/${safeTitle}.jpg`);

      album.image = `./img/${album.title}.jpg`;
      await album.save();
    } catch (err) {
      console.log(err);
      continue;
    }
  }
};

const downloadAndSave = async function (uri, filename, callback) {
  return new Promise((res, rej) => {
    request.head(uri, function (err, response, body) {
      console.log("content-type:", response.headers["content-type"]);
      console.log("content-length:", response.headers["content-length"]);
      request(uri)
        .pipe(fs.createWriteStream(filename))
        .on("close", () => {
          res();
        });
    });
  });
};

const wait = async function (milliseconds) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, milliseconds);
  });
};

getAlbums();
