import React from "react";
import "./Player.css";
import Spotify from "../../Spotify";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumsHidden: true,
      albumLink: [],
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
        <div>
          <h1>{this.props.player.name}</h1>
          <div className="player-container">
            <img src={this.props.player.image} alt="No image" className="img" />
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
            <h5 className="small-title">Albums</h5>
            <p onClick={this.showAlbums} className="clickButton">
              Show/Hide
            </p>
          </div>
          <div id={this.state.albumsHidden ? "hidden" : "shown"}>
            {this.props.player.albums.map((album, index) => {
              return (
                <div key={album.id} className="album">
                  <img src="./img/album-default.png" className="album-image" />
                  <h5 className="album-title">{album.title} </h5>{" "}
                  <label>{album.year}</label>
                  <a
                    href={this.state.albumLink[index]}
                    className="link"
                    target="_blank"
                  >
                    <p>Search on Spotify</p>
                  </a>
                </div>
              );
            })}
          </div>
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
