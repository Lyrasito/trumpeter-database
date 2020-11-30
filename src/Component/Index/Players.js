import "./Players.css";
import React from "react";
import Database from "../../Database";
import Player from "./Player";
import { ReactComponent as CaretDown } from "../../svg/Caret-Down-2.svg";
import { ReactComponent as CaretUp } from "../../svg/Caret-Up.svg";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHidden: true,
      clickedPlayer: null,
      genre: "",
      albums: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.getGenre = this.getGenre.bind(this);
    this.filterByGenre = this.filterByGenre.bind(this);
  }

  async handleClick(player) {

    this.setState({ playerHidden: !this.state.playerHidden})

    try {
      const response = await Database.getPlayerGenres(player);
      //console.log("second", player);
      player.genres = response;
      const albumResponse = await Database.getPlayerAlbums(player);
      //console.log("third", player);
      player.albums = albumResponse;
    } catch (err) {
      console.log(err);
    }
    this.setState({
      clickedPlayer: player,
      albums: player.albums,
    });
  }

  async filterByGenre() {
    const albums = await Database.getGenreAlbums(
      this.state.clickedPlayer.id,
      this.state.genre
    );
    this.setState({ albums: albums });
  }

  getGenre(event) {
    const genre = event.target.value;
    this.setState({ genre: genre });
  }

  render() {
    return (
      <div className="container">
        <div
          key={this.props.player.id}
          className="player-line"
          onClick={() => this.handleClick(this.props.player)}
        >
          <h5>{this.props.player.name}</h5>
          {this.state.playerHidden ? (
            <CaretDown id="caret" />
          ) : (
            <CaretUp id="caret" />
          )}
        </div>
        <div id={this.state.playerHidden ? "hiddenPlayer" : "shownPlayer"}>
          <Player
            player={this.state.clickedPlayer}
            albums={this.state.albums}
            getGenre={this.getGenre}
            filterByGenre={this.filterByGenre}
          />
        </div>
      </div>
    );
  }
}

export default Players;
