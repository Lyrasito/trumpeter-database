import React from "react";
import SearchResults from "./SearchResults";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      term: "",
    };
    this.allPlayersButton = this.allPlayersButton.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }
  allPlayersButton() {
    this.setState({
      searchResults: this.props.allPlayers,
    });
  }
  handleTermChange(event) {
    this.setState({
      term: event.target.value,
    });
  }
  search() {
    this.props.searchPlayersByCity(this.state.term);
  }

  render() {
    return (
      <div>
        <input
          className="citySearch"
          placeholder="Search by City"
          onChange={this.handleTermChange}
        ></input>
        <button className="submit" onClick={this.search}>
          Submit
        </button>
      </div>
    );
  }
}

export default SearchBar;
