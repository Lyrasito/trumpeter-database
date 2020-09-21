import React from "react";
import "./Player.css";
import Spotify from "../../Spotify";
import PlayerPlaceholder from "../../svg/PlayerPlaceholder.svg";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumsHidden: true,
      albumLink: [],
      genre: "",
    };
    this.showAlbums = this.showAlbums.bind(this);
    this.getSpotify = this.getSpotify.bind(this);
  }
  async showAlbums() {
    if (this.state.albumsHidden) {
      this.setState({
        albumsHidden: false,
      });
    } else {
      this.setState({
        albumsHidden: true,
      });
    }
    for (let i = 0; i < this.props.player.albums.length; i++) {
      let link = await this.getSpotify(
        `${this.props.player.albums[i].title} ${this.props.player.name}`
      );
      let links = this.state.albumLink;
      links.push(link);
      this.setState({
        albumLink: links,
      });
    }
  }
  async getSpotify(term) {
    const link = await Spotify.searchAlbum(term);
    return link;
  }

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
              alt=""
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
              <h3>{this.props.player.genres.join(", ")}</h3>
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
            <div id={this.state.albumsHidden ? "hiddenAlbums" : "genreFilter"}>
              <label>Filter by genre:</label>
              <select className="genreSelect" onChange={this.props.getGenre}>
                <option>Select</option>
                {this.props.player.genres.map((genre, index) => {
                  return (
                    <option value={genre} key={index}>
                      {genre}
                    </option>
                  );
                })}
              </select>
              <button
                type="submit"
                className="filterButton"
                onClick={this.props.filterByGenre}
              >
                Filter
              </button>
            </div>
          </div>
          <div id={this.state.albumsHidden ? "hiddenAlbums" : "shownAlbums"}>
            {this.props.albums.map((album, index) => {
              return (
                <div key={album.id} className="album">
                  <img
                    src="./img/album-default.png"
                    className="album-image"
                    alt=""
                  />
                  <h5 className="album-title">{album.title} </h5>{" "}
                  <label>{album.year}</label>
                  <br />
                  <label>Genre: {album.genre}</label>
                  <a
                    href={this.state.albumLink[index]}
                    className="link"
                    target="_blank"
                  >
                    <p>Open with Spotify</p>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Player;
