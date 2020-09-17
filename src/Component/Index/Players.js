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
    };
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(player) {
    if (this.state.playerHidden) {
      this.setState({ playerHidden: false });
    } else {
      this.setState({ playerHidden: true });
    }
    const response = await Database.getPlayerGenres(player);
    player.genres = response;
    const albumResponse = await Database.getPlayerAlbums(player);
    player.albums = albumResponse;
    this.setState({
      clickedPlayer: player,
    });
    console.log(this.state.clickedPlayer);
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
          <Player player={this.state.clickedPlayer} />
        </div>
      </div>
    );
  }
}

export default Players;
