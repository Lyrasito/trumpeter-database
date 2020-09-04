import React from "react";

import "./App.css";
import Database from "../Database";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Player from "./Player";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      allPlayers: [],
    };
    this.allPlayers = this.allPlayers.bind(this);
    this.searchPlayersByCity = this.searchPlayersByCity.bind(this);
  }

  searchPlayersByCity(term) {
    Database.searchPlayersByCity(term).then((response) => {
      this.setState({ searchResults: response });
    });
  }

  allPlayers() {
    Database.getPlayers().then((response) => {
      this.setState({ searchResults: response });
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          searchResults={this.state.searchResults}
          searchPlayersByCity={this.searchPlayersByCity}
          onClick={this.allPlayers}
        />
        <SearchResults searchResults={this.state.searchResults} />
        <button onClick={this.allPlayers}>See All Players</button>
      </div>
    );
  }
}

export default App;

/*{
  id: 1,
  name: "Miles Davis",
  city: "New York",
  startYear: 1945,
  endYear: 1991,
},
{
  id: 2,
  name: "Clifford Brown",
  city: "New York",
  startYear: 1949,
  endYear: 1956,
},
{
  id: 3,
  name: "Chet Baker",
  city: "Los Angeles",
  startYear: 1949,
  endYear: 1988,
}, */
