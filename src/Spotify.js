const fetch = require("node-fetch");
let accessToken;
let userID;
const request = require("request");
const clientID = "client-id";
const clientSecret = "client-secret";
const redirectURI = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization:
          "Basic " +
          new Buffer(clientID + ":" + clientSecret).toString("base64"),
      },
      form: {
        grant_type: "client_credentials",
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        accessToken = body.access_token;
        return accessToken;
      }
    });
  },

  async searchAlbum(term) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=album`,
      {
        headers: {
          Authorization: "Bearer" + accessToken,
        },
      }
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  },
};
Spotify.getAccessToken();
Spotify.searchAlbum("Birth of the cool");
