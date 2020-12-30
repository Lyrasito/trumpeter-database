import React from "react";
import Database from "../../Database";
import "./AddAlbum.css";

class AddAlbum extends React.Component {
  state = {
    playerList: [],
    playerId: null,
    currentPlayer: null,
    title: "",
    year: "",
    genre: "",
    newAlbum: {},
    error: null,
  };

  componentDidMount() {
    this.getAllPlayers();
  }

  getAllPlayers = async () => {
    const allPlayers = await Database.getPlayers();
    this.setState({
      playerList: allPlayers,
    });
  };
  getPlayerId = async (event) => {
    const playerId = event.target.value;
    const response = await Database.getPlayerById(playerId);
    this.setState({
      playerId: playerId,
      currentPlayer: response,
      newAlbum: {},
    });
  };
  handleChange = (event) => {
    const { name, value, type } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({
      [name]: val,
    });
  };

  createAlbum = async () => {
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
  };
  renderAlbum = () => {
    if (this.state.newAlbum.title) {
      return (
        <h3 className="message" data-test="success-message">
          You have added {this.state.newAlbum.title} to the library of{" "}
          {this.state.currentPlayer.name}!
        </h3>
      );
    }
  };
  renderError = () => {
    if (this.state.error) {
      return (
        <h4 className="message" data-test="error-message">
          {this.state.error}
        </h4>
      );
    }
  };
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
              data-test="playerId"
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
              name="title"
              data-test="title"
              onChange={this.handleChange}
              value={this.state.title}
            ></input>
          </label>
          <label>
            Release year
            <input
              className="album-input"
              id="createYear"
              name="year"
              data-test="year"
              type="number"
              onChange={this.handleChange}
              value={this.state.year}
            ></input>
          </label>
          <label>
            Album genre
            <input
              className="album-input"
              id="createGenre"
              name="genre"
              data-test="genre"
              onChange={this.handleChange}
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
