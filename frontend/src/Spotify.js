import fetch from "node-fetch";

if (isHeroku) {
  baseUrl = "https://trumpeter-database-backend.herokuapp.com/api";
} else {
  baseUrl = "http://localhost:4000/api";
}

const Spotify = {
  async getAccessToken() {
    const response = await fetch(`${baseUrl}/token`);
    const jsonResponse = await response.json();
    return jsonResponse.token;
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
      const album = jsonResponse.albums.items[0];
      return album;
    } catch (err) {
      console.log(err);
    }
  },
  async getPlayer(name) {
    const accessToken = await Spotify.getAccessToken();
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
  },
};

export default Spotify;
