import React from "react";
import Database from "../../Database";
import "./AddAlbum.css";

class AddAlbum extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      playerId: null,
      currentPlayer: null,
      title: "",
      year: null,
      genre: "",
      newAlbum: {},
    };
    this.getAllPlayers = this.getAllPlayers.bind(this);
    this.getPlayerId = this.getPlayerId.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getYear = this.getYear.bind(this);
    this.getGenre = this.getGenre.bind(this);
    this.createAlbum = this.createAlbum.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
  }

  componentDidMount() {
    this.getAllPlayers();
  }

  async getAllPlayers() {
    const allPlayers = await Database.getPlayers();
    this.setState({
      playerList: allPlayers,
    });
  }
  async getPlayerId(event) {
    const playerId = event.target.value;
    const response = Database.getPlayerById(playerId);
    this.setState({ playerId: playerId, currentPlayer: response });
  }
  getTitle(event) {
    this.setState({
      title: event.target.value,
    });
  }
  getYear(event) {
    this.setState({
      year: event.target.value,
    });
  }
  getGenre(event) {
    this.setState({
      genre: event.target.value,
    });
  }
  async createAlbum() {
    const response = await Database.addAlbum(
      this.state.playerId,
      this.state.title,
      this.state.year,
      this.state.genre
    );
    this.setState({ newAlbum: response });
    console.log(response);
  }
  renderAlbum() {
    if (this.state.newAlbum.title) {
      return (
        <p>
          You have added {this.state.newAlbum.title} to the library of{" "}
          {this.state.currentPlayer.name}!
        </p>
      );
    }
  }
  render() {
    return (
      <div>
        <h3>Add an album to a player's library!</h3>
        <div className="newAlbum">
          <select
            className="album-input"
            id="players"
            onChange={this.getPlayerId}
            defaultValue="Select Player"
          >
            <option value="">Select Player</option>
            {this.state.playerList.map((player) => {
              return (
                <option
                  value={player.id}
                  key={player.id}
                  onSelect={this.getPlayerId}
                >
                  {player.name}
                </option>
              );
            })}
          </select>

          <input
            className="album-input"
            id="createTitle"
            placeholder="Title"
            onChange={this.getTitle}
          ></input>
          <input
            className="album-input"
            id="createYear"
            placeholder="Year"
            onChange={this.getYear}
          ></input>
          <input
            className="album-input"
            id="createGenre"
            placeholder="Genre"
            onChange={this.getGenre}
          ></input>
          <button type="submit" className="submit" onClick={this.createAlbum}>
            Create
          </button>
          {this.renderAlbum()}
        </div>
      </div>
    );
  }
}

export default AddAlbum;
