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
    const playerId = event.target.value;
    this.setState({ playerId: playerId });
  }
  render() {
    return (
      <div>
        <form>
          <input list="players" />
          <select
            id="players"
            onClick={this.getAllPlayers}
            onChange={this.getPlayerId}
          >
            {this.state.playerList.map((player) => {
              return (
                <option value={player.id} key={player.id}>
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
