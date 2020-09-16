import React from "react";
import { Link, HashRouter as Router } from "react-router-dom";
import "./Landing.css";
import Database from "../../Database";
import SearchBar from "./SearchBar";
import PlayerList from "./PlayerList";
import { ReactComponent as AddLogo } from "../../svg/AddToDatabase.svg";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
    this.allPlayers = this.allPlayers.bind(this);
    this.searchPlayers = this.searchPlayers.bind(this);
    this.searchByName = this.searchByName.bind(this);
  }

  async searchPlayers(city, year, genre) {
    if (!year) {
      year = null;
    } else if (!city) {
      city = null;
    } else if (!genre) {
      genre = null;
    }
    const response = await Database.searchPlayers(city, year, genre);
    this.setState({ searchResults: response });
  }

  async allPlayers() {
    const response = await Database.getPlayers();
    this.setState({ searchResults: response });
  }

  async searchByName(name) {
    const response = await Database.searchByName(name);
    this.setState({ searchResults: response });
  }

  render() {
    return (
      <div className="all">
        <div className="intro-search-container">
          <div className="intro">
            <h1 className="title">Jazz Trumpeteer Database</h1>
            <p className="intro-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          <SearchBar
            searchResults={this.state.searchResults}
            searchPlayers={this.searchPlayers}
            searchByName={this.searchByName}
            allPlayers={this.allPlayers}
          />
        </div>
        <PlayerList players={this.state.searchResults} />
        <footer>
          <Router>
            <Link to="/edit">
              <button className="add">
                Add to Database
                <AddLogo id="addLogo" />
              </button>
            </Link>
          </Router>
        </footer>
      </div>
    );
  }
}

export default Landing;

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
