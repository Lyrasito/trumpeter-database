const fetch = require("node-fetch");

const baseUrl = "http://localhost:4000/api";

const Database = {
  async getPlayers() {
    const url = `${baseUrl}/players`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const players = await jsonResponse.players.map((player) => ({
      id: player.id,
      name: player.name,
      city: player.city,
      startYear: player.start_year,
      endYear: player.end_year,
      image: player.image,
    }));
    return players;
  },

  async searchPlayers(city, year, genre) {
    let url = "";
    if (city && !year && !genre) {
      url = `${baseUrl}/players/search?city=${city}`;
    } else if (year && !city && !genre) {
      url = `${baseUrl}/players/search?year=${year}`;
    } else if (genre && !city && !year) {
      url = `${baseUrl}/players/search?genre=${genre}`;
    } else if (city && year && !genre) {
      url = `${baseUrl}/players/search?city=${city}&year=${year}`;
    } else if (city && genre && !year) {
      url = `${baseUrl}/players/search?city=${city}&genre=${genre}`;
    } else if (genre && year && !city) {
      url = `${baseUrl}/players/search?genre=${genre}&year=${year}`;
    } else if (city && year && genre) {
      url = `${baseUrl}/players/search?city=${city}&year=${year}&genre=${genre}`;
    }
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const players = await jsonResponse.players.map((player) => ({
      id: player.id,
      name: player.name,
      city: player.city,
      startYear: player.start_year,
      endYear: player.end_year,
      image: player.image,
    }));
    return players;
  },

  async searchByName(name) {
    const url = `${baseUrl}/players/search?name=${name}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const players = await jsonResponse.players.map((player) => ({
      id: player.id,
      name: player.name,
      city: player.city,
      startYear: player.start_year,
      endYear: player.end_year,
      image: player.image,
    }));
    return players;
  },

  async getPlayerAlbums(player) {
    const url = `${baseUrl}/players/${player.id}/albums`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const albums = await jsonResponse.albums.map((album) => ({
      id: album.id,
      title: album.title,
      year: album.year,
    }));
    return albums;
  },

  async getPlayerGenres(player) {
    const url = `${baseUrl}/players/${player.id}/albums/genres`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse.genre;
  },

  async addPlayer(name, city, startYear, endYear) {
    const url = `${baseUrl}/players`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player: {
          name: name,
          city: city,
          startYear: startYear,
          endYear: endYear,
        },
      }),
    });

    const jsonResponse = await response.json();
    return jsonResponse.player;
  },

  async addAlbum(playerId, title, year, genre) {
    const url = `${baseUrl}/players/${playerId}/albums`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        album: {
          title: title,
          year: year,
          genre: genre,
          playerId: playerId,
        },
      }),
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  },
};

module.exports = Database;

/*  */
