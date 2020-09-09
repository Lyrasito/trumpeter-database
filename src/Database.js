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
    }));
    console.log(players);
    return players;
  },

  async searchPlayersByCity(city) {
    const url = `${baseUrl}/players/search?city=${city}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    const players = await jsonResponse.players.map((player) => ({
      id: player.id,
      name: player.name,
      city: player.city,
      startYear: player.start_year,
      endYear: player.end_year,
    }));
    console.log(players);
    return players;
  },

  async getPlayerGenres(player) {
    const url = `${baseUrl}/players/${player.id}/albums/genres`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    return jsonResponse.genre;
  },
};

module.exports = Database;

/*  */
