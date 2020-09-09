import React from "react";
import Player from "./Player";
import Database from "../Database";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPlayer: null,
    };
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

  render() {
    return (
      <div>
        {this.props.players.map((player) => {
          return (
            <div key={player.id}>
              <p onClick={() => this.handleClick(player)} value="">
                {player.name}
              </p>
            </div>
          );
        })}
        <Player player={this.state.clickedPlayer} />
      </div>
    );
  }
}

export default PlayerList;
