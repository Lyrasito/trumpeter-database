import React from "react";

class Player extends React.Component {
  render() {
    if (this.props.player) {
      return (
        <div>
          <h1>Name: {this.props.player.name}</h1>
          <h2>City: {this.props.player.city}</h2>
          <h2>
            Career Span: {this.props.player.startYear}-
            {this.props.player.endYear}
          </h2>
          <h2>Genres: {this.props.player.genres.join(", ")}</h2>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Player;
