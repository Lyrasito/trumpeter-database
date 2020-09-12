const fetch = require("node-fetch");
//let accessToken;
let userID;
const request = require("request");
const clientID = "41f9f787eaca48aaa2423f8e9cba760b";
const clientSecret = "61cb6f8f1529418ab9ec65985d02c840";
const redirectURI = "http://localhost:3000/";
const FormData = require("form-data");

/*async getAccessToken() {
    console.log("getaccesstoken");
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
    return new Promise((resolve, reject) => {
      console.log("newPromise");
      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //accessToken = body.access_token;
          resolve(body.access_token);
        } else {
          reject(error);
        }
      });
    });
  }, */

const Spotify = {
  async getAccessToken() {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(clientID + ":" + clientSecret).toString("base64"),
      },
      body: "grant_type=client_credentials",
    });
    const jsonResponse = await response.json();
    return jsonResponse.access_token;
  },

  async searchAlbum(term) {
    const accessToken = await Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=album`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    const jsonResponse = await response.json();
    const id = jsonResponse.albums.items[0].id;
    return `https://open.spotify.com/album/${id}`;
  },
};

export default Spotify;
