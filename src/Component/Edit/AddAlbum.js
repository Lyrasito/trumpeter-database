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
      error: null,
    };
    this.getAllPlayers = this.getAllPlayers.bind(this);
    this.getPlayerId = this.getPlayerId.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.getYear = this.getYear.bind(this);
    this.getGenre = this.getGenre.bind(this);
    this.createAlbum = this.createAlbum.bind(this);
    this.renderAlbum = this.renderAlbum.bind(this);
    this.renderError = this.renderError.bind(this);
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
    const response = await Database.getPlayerById(playerId);
    this.setState({ playerId: playerId, currentPlayer: response });
    console.log(
      playerId,
      response,
      this.state.playerId,
      this.state.currentPlayer
    );
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
    try {
      const response = await Database.addAlbum(
        this.state.playerId,
        this.state.title,
        this.state.year,
        this.state.genre
      );
      this.setState({ newAlbum: response });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }
  renderAlbum() {
    if (this.state.newAlbum.title) {
      return (
        <h3>
          You have added {this.state.newAlbum.title} to the library of{" "}
          {this.state.currentPlayer.name}!
        </h3>
      );
    }
  }
  renderError() {
    if (this.state.error) {
      return <h4>{this.state.error}</h4>;
    }
  }
  render() {
    return (
      <div>
        <h3>Add an album to a player's library!</h3>
        <div className="newAlbum">
          <label>
            Select Player
            <select
              className="album-input"
              id="players"
              onChange={this.getPlayerId}
              defaultValue="Select Player"
            >
              <option value=""></option>
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
          </label>
          <label>
            Album title
            <input
              className="album-input"
              id="createTitle"
              onChange={this.getTitle}
            ></input>
          </label>
          <label>
            Release year{" "}
            <input
              className="album-input"
              id="createYear"
              onChange={this.getYear}
            ></input>
          </label>
          <label>
            Album genre
            <input
              className="album-input"
              id="createGenre"
              onChange={this.getGenre}
            ></input>
          </label>

          <button type="submit" className="submit" onClick={this.createAlbum}>
            Add Album
          </button>
        </div>
        {this.renderAlbum()}
        {this.renderError()}
      </div>
    );
  }
}

export default AddAlbum;
