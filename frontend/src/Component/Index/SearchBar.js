import React from "react";
import "./SearchBar.css";
import SearchByName from "./SearchByName";
import SearchByCityYearGenre from "./SearchByCityYearGenre";

class SearchBar extends React.Component {
  state = {
    searchResults: [],
    searchByName: true,
    SearchByCityYearGenre: false,
    haveSearched: false,
  };

  allPlayersButton = () => {
    this.setState({
      searchResults: this.props.allPlayers,
    });
  };

  changeSearch = () => {
    this.setState({
      searchByName: !this.state.searchByName,
      searchByCityYearGenre: !this.state.searchByCityYearGenre,
    });
  };

  haveSearched = () => {
    this.setState({ haveSearched: true });
  };
  renderNoResults = () => {
    if (this.props.searchResults.length === 0 && this.state.haveSearched) {
      return <h4>Sorry, your search returned no results.</h4>;
    }
  };

  render() {
    return (
      <div className="container">
        <div className="click-container">
          <h4
            className={this.state.searchByName ? "clicked" : "clickable"}
            onClick={this.changeSearch}
          >
            Search by name
          </h4>
          <h4
            className={
              this.state.SearchByCityYearGenre ? "clicked" : "clickable"
            }
            onClick={this.changeSearch}
          >
            Search by city, year, genre
          </h4>
        </div>
        {this.state.searchByName && (
          <SearchByName
            searchByName={this.props.searchByName}
            haveSearched={this.haveSearched}
          />
        )}
        {this.state.searchByCityYearGenre && (
          <SearchByCityYearGenre
            searchPlayers={this.props.searchPlayers}
            haveSearched={this.haveSearched}
          />
        )}
        <h5 onClick={this.props.allPlayers} className="allPlayers">
          Or, see all players
        </h5>
        {this.renderNoResults()}
      </div>
    );
  }
}

export default SearchBar;
