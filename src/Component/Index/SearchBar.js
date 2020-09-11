import React from "react";
import "./SearchBar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      city: "",
      year: "",
      genre: "",
      name: "",
    };
    this.allPlayersButton = this.allPlayersButton.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleGenreChange = this.handleGenreChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.search = this.search.bind(this);
    this.nameSearch = this.nameSearch.bind(this);
  }
  allPlayersButton() {
    this.setState({
      searchResults: this.props.allPlayers,
    });
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
  }
  nameSearch() {
    this.props.searchByName(this.state.name);
  }

  render() {
    return (
      <div className="container">
        <div className="nameSearch">
          <input
            className="search"
            id="nameSearch"
            placeholder="Search by Name"
            onChange={this.handleNameChange}
          ></input>
          <br />
          <button className="submit" onClick={this.nameSearch}>
            Submit
          </button>
        </div>
        <div className="searchbar">
          <input
            className="search"
            id="citySearch"
            placeholder="Search by City"
            onChange={this.handleCityChange}
          ></input>
          <input
            className="search"
            id="yearSearch"
            placeholder="Search by Year"
            onChange={this.handleYearChange}
          ></input>
          <input
            className="search"
            id="genreSearch"
            placeholder="Search by Genre"
            onChange={this.handleGenreChange}
          ></input>
          <br />
        </div>
        <div className="button-container">
          <button className="submit" onClick={this.search}>
            Submit
          </button>
          <br />

          <br />
          <button onClick={this.props.allPlayers} className="allPlayers">
            See All Players
          </button>
        </div>
      </div>
    );
  }
}

export default SearchBar;
