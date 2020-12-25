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
    const { value, name } = event.target;
    this.setState({ [name]: value });
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
        <h3 className="message">
          You have added {this.state.newPlayer.name} to the database!
        </h3>
      );
    }
  };
  renderError = () => {
    if (this.state.error) {
      return <h4 className="message">{this.state.error}</h4>;
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
              id="createName"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            ></input>
          </label>
          <label>
            City/Cities
            <input
              className="player-input"
              id="createCity"
              name="city"
              onChange={this.handleChange}
              value={this.state.city}
            ></input>
          </label>
          <label>
            Year career started
            <input
              className="player-input"
              id="createStartYear"
              name="startYear"
              onChange={this.handleChange}
              value={this.state.startYear}
            ></input>
          </label>
          <label>
            Year career ended
            <input
              className="player-input"
              id="createEndYear"
              name="endYear"
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
