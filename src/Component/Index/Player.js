import React from "react";
import "./Player.css";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumsHidden: true,
    };
    this.showAlbums = this.showAlbums.bind(this);
  }
  showAlbums() {
    if (this.state.albumsHidden) {
      this.setState({
        albumsHidden: false,
      });
    } else {
      this.setState({
        albumsHidden: true,
      });
    }
  }
  render() {
    if (this.props.player) {
      return (
        <div>
          <h1>Name: {this.props.player.name}</h1>
          <img src={this.props.player.image} />
          <h2>City: {this.props.player.city}</h2>
          <h2>
            Career Span: {this.props.player.startYear}-
            {this.props.player.endYear}
          </h2>
          <h2>Genres: {this.props.player.genres.join(", ")}</h2>
          <h2 onClick={this.showAlbums} className="clickButton">
            Show/Hide Albums
          </h2>
          <div id={this.state.albumsHidden ? "hidden" : "shown"}>
            {this.props.player.albums.map((album) => {
              return (
                <div key={album.id}>
                  <h4>Title: {album.title} </h4> <h4>Year: {album.year}</h4>
                </div>
              );
            })}
          </div>
          <h2
            onClick={this.showAlbums}
            className="clickButton"
            id={this.state.albumsHidden ? "hidden" : "shown"}
          >
            Hide Albums
          </h2>
          <h3 onClick={this.props.hidePlayer} className="clickButton">
            Hide Player
          </h3>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Player;
