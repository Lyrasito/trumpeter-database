const pkg = require("./Models.js");
const { Album, Player } = pkg;
const { getAlbum, getPlayer } = require("./Spotify");
const request = require("request");
const fs = require("fs");

//written by Kevin
const getAlbums = async () => {
  let albumsArray = await Album.findAll({ include: Player });
  for (let album of albumsArray) {
    console.log("processing", album.title);
    await wait(1000);

    try {
      const spotifyAlbum = await getAlbum(
        album.title + " " + album.Player.name
      );
      const imageUrl = spotifyAlbum.images[0].url;

      let safeTitle = album.title.replace("/", "");
      safeTitle = safeTitle.replace("?", "");
      await downloadAndSave(
        imageUrl,
        `../frontend/public/img/Albums/${safeTitle}.jpg`
      );

      album.image = `./img/Albums/${safeTitle}.jpg`;
      await album.save();
    } catch (err) {
      console.log(err);
      continue;
    }
  }
};

const getPlayers = async () => {
  let playersArray = await Player.findAll();
  for (let player of playersArray) {
    console.log("processing", player.name);
    await wait(1000);
    try {
      const spotifyPlayer = await getPlayer(player.name);
      const imageUrl = spotifyPlayer.images[0].url;
      await downloadAndSave(
        imageUrl,
        `../frontend/public/img/Players/${player.name}.jpg`
      );
      player.image = `./img/Players/${player.name}.jpg`;
      await player.save();
    } catch (err) {
      console.log(err);
    }
  }
};

const downloadAndSave = async function (uri, filename, callback) {
  return new Promise((res, rej) => {
    request.head(uri, function (err, response, body) {
      // console.log("content-type:", response.headers["content-type"]);
      //  console.log("content-length:", response.headers["content-length"]);
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

getPlayers();
getAlbums();
