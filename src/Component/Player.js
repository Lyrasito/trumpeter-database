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
          <h2>Albums: </h2>
          {this.props.player.albums.map((album) => {
            return (
              <div key={album.id}>
                <h4>Title: {album.title} </h4> <h4>Year: {album.year}</h4>
              </div>
            );
          })}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Player;
