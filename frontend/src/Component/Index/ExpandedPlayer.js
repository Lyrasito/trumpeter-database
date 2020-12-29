import React from "react";
import "./ExpandedPlayer.css";
import Spotify from "../../Spotify";
import Database from "../../Database";
import PlayerPlaceholder from "../../svg/PlayerPlaceholder.svg";
import Albums from "./Albums";

class ExpandedPlayer extends React.Component {
  state = {
    albumsShown: false,
    genres: [],
    albums: [],
  };
  componentDidMount() {
    this.getAlbumsAndGenres();
  }

  getAlbumsAndGenres = async () => {
    const genreResponse = await Database.getPlayerGenres(this.props.player);
    const albumResponse = await Database.getPlayerAlbums(this.props.player);

    this.setState({
      genres: genreResponse,
      albums: albumResponse,
    });
  };
  showAlbums = () => {
    this.setState({ albumsShown: !this.state.albumsShown });
  };
  getSpotify = async (term) => {
    const link = await Spotify.searchAlbum(term);
    return link;
  };

  render() {
    if (this.props.player) {
      return (
        <div className="player-album-container">
          <h1>{this.props.player.name}</h1>
          <div className="player-container">
            <img
              src={
                this.props.player.image
                  ? this.props.player.image
                  : PlayerPlaceholder
              }
              alt={this.props.player.name}
              className="img"
            />
            <div className="career-span">
              <h5 className="small-title">Career Span:</h5>
              <h3>
                {this.props.player.startYear}-{this.props.player.endYear}
              </h3>
            </div>
            <div className="city-genres">
              <h5 className="small-title">City: </h5>
              <h3>{this.props.player.city}</h3>

              <h5 className="small-title">Genres:</h5>
              <h3>{this.state.genres.join(", ")}</h3>
            </div>
          </div>

          <div className="albumsHeader">
            <div className="showHide">
              <p className="small-title" id="album-header">
                Albums
              </p>
              <p onClick={this.showAlbums} className="clickButton">
                Show/Hide
              </p>
            </div>
          </div>

          {this.state.albumsShown && (
            <Albums
              albums={this.state.albums}
              player={this.props.player}
              genres={this.state.genres}
            />
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ExpandedPlayer;
