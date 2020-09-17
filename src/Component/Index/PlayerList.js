import React from "react";
import Player from "./Player";
import Database from "../../Database";
import "./PlayerList.css";
import { ReactComponent as CaretDown } from "../../svg/Caret-Down-2.svg";
import { ReactComponent as CaretUp } from "../../svg/Caret-Up.svg";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPlayer: null,
    };
    this.hidePlayer = this.hidePlayer.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  async handleClick(player) {
    const response = await Database.getPlayerGenres(player);
    player.genres = response;
    const albumResponse = await Database.getPlayerAlbums(player);
    player.albums = albumResponse;
    this.setState({
      clickedPlayer: player,
    });
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
          return (
            <div
              key={player.id}
              className="player-line"
              onClick={() => this.handleClick(player)}
            >
              <h5 value="">{player.name}</h5>
              <CaretDown id="caret-down" />
            </div>
          );
        })}
        <Player
          player={this.state.clickedPlayer}
          hidePlayer={this.hidePlayer}
        />
      </div>
    );
  }
}

export default PlayerList;
