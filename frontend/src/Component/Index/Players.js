import "./Players.css";
import React from "react";
import Database from "../../Database";
import Player from "./Player";
import { ReactComponent as CaretDown } from "../../svg/Caret-Down-2.svg";
import { ReactComponent as CaretUp } from "../../svg/Caret-Up.svg";

class Players extends React.Component {
  state = {
    playerShown: false,
    clickedPlayer: null,
    genre: "",
    albums: null,
    shownAlbums: null,
  };

  handleClick = async (player) => {
    try {
      const response = await Database.getPlayerGenres(player);

      player.genres = response;
      const albumResponse = await Database.getPlayerAlbums(player);
      player.albums = albumResponse;
      this.setState({
        clickedPlayer: player,
        albums: player.albums,
        shownAlbums: player.albums,
        playerShown: !this.state.playerShown,
      });
    } catch (err) {
      console.log(err);
    }
  };

  filterByGenre = (genre) => {
    if (genre === "noFilter") {
      this.setState({ shownAlbums: this.state.albums });
    } else {
      const newAlbums = this.state.albums.filter(
        (album) => album.genre === genre
      );

      this.setState({ shownAlbums: newAlbums });
    }
  };

  getGenre = (event) => {
    console.log("get Genre");
    const genre = event.target.value;
    this.setState({ genre: genre });
  };

  render() {
    return (
      <div className="container ">
        <div className="player-line-container">
          <div
            key={this.props.player.id}
            className="player-line"
            onClick={() => this.handleClick(this.props.player)}
          >
            <h5>{this.props.player.name}</h5>
            {this.state.playerShown ? (
              <CaretUp id="caret" />
            ) : (
              <CaretDown id="caret" />
            )}
          </div>
          <div id="shownPlayer">
            {this.state.playerShown && (
              <Player
                player={this.state.clickedPlayer}
                albums={this.state.shownAlbums}
                getGenre={this.getGenre}
                filterByGenre={this.filterByGenre}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Players;
