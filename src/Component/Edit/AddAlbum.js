import React from "react";
import Database from "../../Database";

class AddAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      playerId: null,
    };
    this.getAllPlayers = this.getAllPlayers.bind(this);
    this.getPlayerId = this.getPlayerId.bind(this);
  }
  async getAllPlayers() {
    const allPlayers = await Database.getPlayers();
    this.setState({
      playerList: allPlayers,
    });
  }
  getPlayerId(event) {
    console.log(event.target);
    const player = event.target.value;
    this.setState({ playerId: player.id });
  }
  render() {
    return (
      <div>
        <form>
          <input list="players" />
          <select id="players" onClick={this.getAllPlayers}>
            {this.state.playerList.map((player) => {
              return (
                <option
                  value={player}
                  key={player.id}
                  onSelect={this.getPlayerId}
                >
                  {player.name}
                </option>
              );
            })}
          </select>
        </form>

        <input></input>
      </div>
    );
  }
}

export default AddAlbum;
