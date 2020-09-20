import React from "react";
import "./SearchBar.css";
import { ReactComponent as SearchLogo } from "../../svg/Search.svg";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      city: "",
      year: "",
      genre: "",
      name: "",
      searchBy: "name",
      haveSearched: false,
    };
    this.allPlayersButton = this.allPlayersButton.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.search = this.search.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
    this.changeSearch = this.changeSearch.bind(this);
    this.renderNoResults = this.renderNoResults.bind(this);
  }
  allPlayersButton() {
    this.setState({
      searchResults: this.props.allPlayers,
    });
    this.setState({ haveSearched: true });
  }
  handleCityChange(event) {
    this.setState({
      city: event.target.value,
    });
  }

  handleYearChange(event) {
    this.setState({
      year: event.target.value,
    });
  }

  handleGenreChange(event) {
    this.setState({
      genre: event.target.value,
    });
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value,
    });
  }

  search() {
    this.props.searchPlayers(
      this.state.city,
      this.state.year,
      this.state.genre
    );
    this.setState({ haveSearched: true });
  }
  nameSearch() {
    this.props.searchByName(this.state.name);
    this.setState({ haveSearched: true });
  }
  changeSearch() {
    if (this.state.searchBy === "name") {
      this.setState({
        searchBy: "cityGenreYear",
      });
    } else {
      this.setState({
        searchBy: "name",
      });
    }
  }
  renderNoResults() {
    if (this.state.searchResults.length === 0 && this.state.haveSearched) {
      return <h4>Sorry, your search returned no results.</h4>;
    }
  }

  render() {
    if (this.state.searchBy === "name") {
      return (
        <div className="container">
          <div className="click-container">
            <h4 className="clicked">Search by name</h4>
            <h4 onClick={this.changeSearch} className="clickable">
              Search by genre, year, city
            </h4>
          </div>
          <div className="nameSearch">
            <input id="nameSearch" onChange={this.handleNameChange}></input>
            <br />
            <button className="submit" onClick={this.nameSearch}>
              Search
              <SearchLogo />
            </button>
            <br />
          </div>
          <h5 onClick={this.props.allPlayers} className="allPlayers">
            Or, see all players
          </h5>
          {this.renderNoResults()}
        </div>
      );
    } else if (this.state.searchBy === "cityGenreYear") {
      return (
        <div className="container">
          <div className="click-container">
            <h4 onClick={this.changeSearch} className="clickable">
              Search by name
            </h4>
            <h4 className="clicked">Search by city, year, genre</h4>
          </div>
          <div className="searchbar">
            <label>
              City
              <input
                className="search"
                id="citySearch"
                onChange={this.handleCityChange}
              ></input>
            </label>
            <label>
              Year
              <input
                className="search"
                id="yearSearch"
                onChange={this.handleYearChange}
              ></input>
            </label>
            <label>
              Genre
              <input
                className="search"
                id="genreSearch"
                onChange={this.handleGenreChange}
              ></input>
            </label>
          </div>
          <div className="button-container">
            <button className="submit" onClick={this.search}>
              Search
              <SearchLogo />
            </button>
            <br />
            <h5 onClick={this.props.allPlayers} className="allPlayers">
              Or, see all players
            </h5>
          </div>
          {this.renderNoResults()}
        </div>
      );
    }
  }
}

export default SearchBar;
