import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Database from "../../Database";
import SearchBar from "./SearchBar";
import PlayerList from "./PlayerList";
import { ReactComponent as AddLogo } from "../../svg/AddToDatabase.svg";
import { ReactComponent as SearchLogo } from "../../svg/Search.svg";

class Landing extends React.Component {
  state = {
    searchResults: [],
  };

  scrollToResults = () => {
    const searchResults = document.getElementById("searchResults");
    const box = searchResults.getBoundingClientRect();
    window.scrollTo(0, box.top);
  };

  searchPlayers = async (city, year, genre) => {
    if (!year) {
      year = null;
    } else if (!city) {
      city = null;
    } else if (!genre) {
      genre = null;
    }
    const response = await Database.searchPlayers(city, year, genre);
    this.setState({ searchResults: response });
    this.scrollToResults();
  };

  allPlayers = async () => {
    const response = await Database.getPlayers();
    this.setState({ searchResults: response });
    this.scrollToResults();
  };

  searchByName = async (name) => {
    const response = await Database.searchByName(name);
    this.setState({ searchResults: response });
    this.scrollToResults();
  };

  render() {
    return (
      <div className="all">
        <div className="intro-search-container">
          <div className="intro">
            <h1 className="title">Jazz Trumpeter Database</h1>
            <p className="intro-paragraph">
              Search for jazz trumpet players in the 20th and 21st centuries by
              name, or filter them by year, city, and/or genre.
            </p>
          </div>
          <div className="searchBar">
            <SearchBar
              searchResults={this.state.searchResults}
              searchPlayers={this.searchPlayers}
              searchByName={this.searchByName}
              allPlayers={this.allPlayers}
            />
          </div>
        </div>
        <div id="searchResults">
          <PlayerList players={this.state.searchResults} />
        </div>

        <footer>
          <Link to="/edit">
            <button className="add">
              Add to Database
              <AddLogo id="addLogo" />
            </button>
          </Link>

          <br />
          <a href="/">
            <button className="submit">
              Search
              <SearchLogo />
            </button>
          </a>
        </footer>
      </div>
    );
  }
}

export default Landing;
