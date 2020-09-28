import React from "react";
import Database from "../../Database";
import "./AddPlayer.css";

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      startYear: null,
      endYear: null,
      newPlayer: {},
      error: null,
    };
    this.getName = this.getName.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getStartYear = this.getStartYear.bind(this);
    this.getEndYear = this.getEndYear.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  getName(event) {
    this.setState({ name: event.target.value });
  }
  getCity(event) {
    this.setState({ city: event.target.value });
  }
  getStartYear(event) {
    this.setState({ startYear: event.target.value });
  }
  getEndYear(event) {
    this.setState({ endYear: event.target.value });
  }
  async addPlayer() {
    try {
      const newPlayer = await Database.addPlayer(
        this.state.name,
        this.state.city,
        this.state.startYear,
        this.state.endYear
      );
      this.setState({
        newPlayer: newPlayer,
        name: "",
        city: "",
        startYear: "",
        endYear: "",
      });
    } catch (err) {
      this.setState({ error: err.message, newPlayer: {} });
    }
  }
  renderPlayer() {
    if (this.state.newPlayer.name) {
      return (
        <h3 className="message">
          You have added {this.state.newPlayer.name} to the database!
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
      <div className="newPlayer-container">
        <h3 className="message">Add a player to the database!</h3>
        <div className="newPlayer">
          <label>
            Name
            <input
              className="player-input"
              id="createName"
              onChange={this.getName}
              value={this.state.name}
            ></input>
          </label>
          <label>
            City/Cities
            <input
              className="player-input"
              id="createCity"
              onChange={this.getCity}
              value={this.state.city}
            ></input>
          </label>
          <label>
            Year career started
            <input
              className="player-input"
              id="createStartYear"
              onChange={this.getStartYear}
              value={this.state.startYear}
            ></input>
          </label>
          <label>
            Year career ended
            <input
              className="player-input"
              id="createEndYear"
              onChange={this.getEndYear}
              value={this.state.endYear}
            ></input>
          </label>

          <button type="submit" className="submit" onClick={this.addPlayer}>
            Add Player
          </button>
        </div>
        {this.renderPlayer()}
        {this.renderError()}
      </div>
    );
  }
}

export default AddPlayer;
