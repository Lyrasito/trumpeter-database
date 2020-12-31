const fetch = require("node-fetch");
const dotenv = require("dotenv");
dotenv.config();

const getSpotifyToken = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer(
          process.env.SPOTIFY_ID + ":" + process.env.SPOTIFY_SECRET
        ).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });
  const jsonResponse = await response.json();
  return jsonResponse.access_token;
};

const getAlbum = (term) => {
  const accessToken = await getSpotifyToken();
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=album`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const jsonResponse = await response.json();
    const album = jsonResponse.albums.items[0];
    return album;
  } catch (err) {
    console.log(err);
  }
}
const getPlayer = async (name) => {
  const accessToken = await getSpotifyToken();
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${name}&type=artist`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const jsonResponse = await response.json();
    const player = jsonResponse.artists.items[0];
    return player;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {getSpotifyToken, getAlbum, getPlayer};
