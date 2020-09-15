import React from "react";
import Player from "./Player";
import Database from "../../Database";
import "./PlayerList.css";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPlayer: null,
    };
    this.hidePlayer = this.hidePlayer.bind(this);
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

  render() {
    if (this.props.players.length > 0) {
      return (
        <div className="player-list">
          <h2>Players</h2>
          {this.props.players.map((player) => {
            return (
              <div key={player.id}>
                <h5
                  onClick={() => this.handleClick(player)}
                  value=""
                  id="playerList"
                >
                  {player.name}
                </h5>
              </div>
            );
          })}
          <Player
            player={this.state.clickedPlayer}
            hidePlayer={this.hidePlayer}
          />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default PlayerList;
