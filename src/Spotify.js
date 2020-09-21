const fetch = require("node-fetch");
//const keys = require("./keys.json");

const clientID = "clientId";
const clientSecret = "clientSecret";

console.log(process.env.REACT_APP_CLIENT_KEY);

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
    }
  },
};

export default Spotify;
