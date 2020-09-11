import "./Players.css";
import React from "react";
import Database from "../Database";
import Player from "./Player";

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerHidden: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div id={this.state.playerHidden ? "hiddenPlayer" : "player"}>
          <Player
            name={this.props.name}
            city={this.props.city}
            startYear={this.props.startYear}
            endYear={this.props.endYear}
          />
        </div>
      </div>
    );
  }
}

export default Players;

//  onClick={this.handleClick()}
