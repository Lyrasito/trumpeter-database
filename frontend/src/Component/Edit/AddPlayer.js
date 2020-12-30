import React from "react";
import Database from "../../Database";
import "./AddPlayer.css";

class AddPlayer extends React.Component {
  state = {
    name: "",
    city: "",
    startYear: "",
    endYear: "",
    newPlayer: {},
    error: null,
  };

  handleChange = (event) => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  addPlayer = async () => {
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
  };
  renderPlayer = () => {
    if (this.state.newPlayer.name) {
      return (
        <h3 className="message" data-test="success-message">
          You have added {this.state.newPlayer.name} to the database!
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
      <div className="newPlayer-container">
        <h3 className="message">Add a player to the database!</h3>
        <div className="newPlayer">
          <label>
            Name
            <input
              className="player-input"
              name="name"
              data-test="name"
              onChange={this.handleChange}
              value={this.state.name}
            ></input>
          </label>
          <label>
            City/Cities
            <input
              className="player-input"
              name="city"
              data-test="city"
              onChange={this.handleChange}
              value={this.state.city}
            ></input>
          </label>
          <label>
            Year career started
            <input
              className="player-input"
              name="startYear"
              data-test="startYear"
              type="number"
              onChange={this.handleChange}
              value={this.state.startYear}
            ></input>
          </label>
          <label>
            Year career ended
            <input
              className="player-input"
              name="endYear"
              data-test="endYear"
              type="number"
              onChange={this.handleChange}
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
