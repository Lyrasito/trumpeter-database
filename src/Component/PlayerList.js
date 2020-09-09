import React from "react";
import Player from "./Player";
import Database from "../Database";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedPlayer: null,
      clickedPlayerGenres: null,
    };
  }

  async handleClick(player) {
    const response = await Database.getPlayerGenres(player);
    player.genres = response;
    console.log(player);
    console.log(player.genres);
    this.setState({
      clickedPlayer: player,
    });
  }

  render() {
    return (
      <div>
        {this.props.players.map((player) => {
          return (
            <div>
              <p onClick={() => this.handleClick(player)} value="">
                {player.name}
              </p>
            </div>
            /* <Players
              name={player.name}
              city={player.city}
              startYear={player.startYear}
              endYear={player.endYear}
              key={player.id}
            />
            */
          );
        })}
        <Player player={this.state.clickedPlayer} />
      </div>
    );
  }
}

export default PlayerList;
