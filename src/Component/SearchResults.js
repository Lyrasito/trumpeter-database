import React from "react";
import PlayerList from "./PlayerList";

class SearchResults extends React.Component {
  render() {
    return (
      <div>
        <h1>Players</h1>
        <PlayerList players={this.props.searchResults} />
      </div>
    );
  }
}

export default SearchResults;
