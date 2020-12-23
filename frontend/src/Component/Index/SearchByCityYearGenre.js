import React from "react";
import { ReactComponent as SearchLogo } from "../../svg/Search.svg";

class SearchByCityYearGenre extends React.Component {
  state = {
    city: "",
    year: "",
    genre: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  search = () => {
    this.props.searchPlayers(
      this.state.city,
      this.state.year,
      this.state.genre
    );
    this.setState({ city: "", year: "", genre: "" });
    this.props.haveSearched();
  };

  render() {
    return (
      <div>
        <div className="searchbar">
          <label>
            City
            <input
              className="search"
              id="citySearch"
              name="city"
              onChange={this.handleChange}
              value={this.state.city}
            ></input>
          </label>
          <label>
            Year
            <input
              className="search"
              id="yearSearch"
              name="year"
              onChange={this.handleChange}
              value={this.state.year}
            ></input>
          </label>
          <label>
            Genre
            <input
              className="search"
              id="genreSearch"
              name="genre"
              onChange={this.handleChange}
              value={this.state.genre}
            ></input>
          </label>
        </div>
        <button className="submit" onClick={this.search}>
          Search
          <SearchLogo />
        </button>
      </div>
    );
  }
}

export default SearchByCityYearGenre;
