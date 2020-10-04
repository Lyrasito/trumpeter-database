import fetch from "node-fetch";
//import keys from "./keys.js";
const isHeroku = process.env.NODE_ENV === "production";
let clientID, clientSecret;

if (isHeroku) {
  clientID = process.env.REACT_APP_SPOTIFY_ID;
  clientSecret = process.env.REACT_APP_SPOTIFY_SECRET;
} /*else {
  clientID = keys.clientID;
  clientSecret = keys.clientSecret;
}*/
//console.log(process.env);

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
      const id = jsonResponse.albums.items[0].id;
      return `https://open.spotify.com/album/${id}`;
    } catch (err) {
      console.log(err);
      console.log(isHeroku);
    }
  },
  async getAlbum(term) {
    const accessToken = await Spotify.getAccessToken();
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
      //console.log(jsonResponse);
      const album = jsonResponse.albums.items[0];
      return album;
    } catch (err) {
      console.log(err);
    }
  },
};

export default Spotify;
