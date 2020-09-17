import React from "react";
import Database from "../../Database";

class AddPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      city: "",
      startYear: null,
      endYear: null,
      newPlayer: {},
    };
    this.getName = this.getName.bind(this);
    this.getCity = this.getCity.bind(this);
    this.getStartYear = this.getStartYear.bind(this);
    this.getEndYear = this.getEndYear.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
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
    const newPlayer = await Database.addPlayer(
      this.state.name,
      this.state.city,
      this.state.startYear,
      this.state.endYear
    );
    this.setState({ newPlayer: newPlayer });
    return newPlayer;
  }
  renderPlayer() {
    if (this.state.newPlayer.name) {
      return <p>You have added {this.state.newPlayer.name} to the database!</p>;
    }
  }
  render() {
    return (
      <div>
        <input
          id="createName"
          placeholder="Name"
          onChange={this.getName}
        ></input>
        <input
          id="createCity"
          placeholder="City"
          onChange={this.getCity}
        ></input>
        <input
          id="createStartYear"
          placeholder="Start Year"
          onChange={this.getStartYear}
        ></input>
        <input
          id="createEndYear"
          placeholder="End Year"
          onChange={this.getEndYear}
        ></input>
        <button type="submit" onClick={this.addPlayer}>
          Add Player
        </button>
        {this.renderPlayer()}
      </div>
    );
  }
}

export default AddPlayer;
