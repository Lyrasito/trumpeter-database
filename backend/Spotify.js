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

module.exports = getSpotifyToken;
