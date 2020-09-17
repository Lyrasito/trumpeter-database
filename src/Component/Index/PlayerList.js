import React from "react";
import Player from "./Player";
import Database from "../../Database";
import Spotify from "../../Spotify";
import Players from "./Players";
import "./PlayerList.css";
import { ReactComponent as CaretDown } from "../../svg/Caret-Down-2.svg";
import { ReactComponent as CaretUp } from "../../svg/Caret-Up.svg";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHidden: true,
      albumsHidden: true,
      albumLink: [],
    };
    this.hidePlayer = this.hidePlayer.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.getSpotify = this.getSpotify.bind(this);
    this.showAlbums = this.showAlbums.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async getSpotify(term) {
    const link = await Spotify.searchAlbum(term);
    return link;
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

  handleClick() {
    if (this.state.playerHidden) {
      this.setState({ playerHidden: false });
    } else {
      this.setState({ playerHidden: true });
    }
  }

  hidePlayer() {
    this.setState({
      clickedPlayer: null,
    });
  }

  renderHeader() {
    if (this.props.players.length > 0) {
      return <h2>Players</h2>;
    }
  }

  render() {
    return (
      <div className="player-list">
        {this.renderHeader()}
        {this.props.players.map((player) => {
          return <Players player={player} />;
        })}
      </div>
    );
  }
}

export default PlayerList;

// <h3>{player.genres.join(", ")}</h3>

/* <div
                  id={this.state.albumsHidden ? "hiddenAlbums" : "shownAlbums"}
                >
                  {player.albums.map((album, index) => {
                    return (
                      <div key={album.id} className="album">
                        <img
                          src="./img/album-default.png"
                          className="album-image"
                        />
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
                </div> */

/*  */

/* <Player
          player={this.state.clickedPlayer}
          hidePlayer={this.hidePlayer}
        /> */

/* <div
                id={this.state.playerHidden ? "hiddenPlayer" : "shownPlayer"}
              >
                <h1>{player.name}</h1>
                <div className="player-container">
                  <img src={player.image} alt="No image" className="img" />
                  <div className="career-span">
                    <h5 className="small-title">Career Span:</h5>
                    <h3>
                      {player.startYear}-{player.endYear}
                    </h3>
                  </div>
                  <div className="city-genres">
                    <h5 className="small-title">City: </h5>
                    <h3>{player.city}</h3>

                    <h5 className="small-title">Genres:</h5>
                  </div>
                </div>
                <div className="albumsHeader">
                  <h5 className="small-title">Albums</h5>
                  <p onClick={this.showAlbums} className="clickButton">
                    Show/Hide
                  </p>
                </div>

                <h3 onClick={this.props.hidePlayer} className="clickButton">
                  Hide Player
                </h3>
              </div> */

/*  */
