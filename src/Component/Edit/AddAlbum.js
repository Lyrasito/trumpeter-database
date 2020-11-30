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
      year: "",
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
    this.setState({
      playerId: playerId,
      currentPlayer: response,
      newAlbum: {},
    });
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
      this.setState({ newAlbum: response, title: "", year: "", genre: "" });
    } catch (err) {
      this.setState({ error: err.message, newAlbum: {} });
    }
  }
  renderAlbum() {
    if (this.state.newAlbum.title) {
      return (
        <h3 className="message">
          You have added {this.state.newAlbum.title} to the library of{" "}
          {this.state.currentPlayer.name}!
        </h3>
      );
    }
  }
  renderError() {
    if (this.state.error) {
      return <h4 className="message">{this.state.error}</h4>;
    }
  }
  render() {
    return (
      <div>
        <h3 className="message">Add an album to a player's library!</h3>
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
              value={this.state.title}
            ></input>
          </label>
          <label>
            Release year{" "}
            <input
              className="album-input"
              id="createYear"
              onChange={this.getYear}
              value={this.state.year}
            ></input>
          </label>
          <label>
            Album genre
            <input
              className="album-input"
              id="createGenre"
              onChange={this.getGenre}
              value={this.state.genre}
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
