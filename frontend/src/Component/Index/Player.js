import "./Player.css";
import React from "react";
import ExpandedPlayer from "./ExpandedPlayer";
import { ReactComponent as CaretDown } from "../../svg/Caret-Down-2.svg";
import { ReactComponent as CaretUp } from "../../svg/Caret-Up.svg";

class Player extends React.Component {
  state = {
    playerShown: false,
  };

  handleClick = () => {
    this.setState({
      playerShown: !this.state.playerShown,
    });
  };

  render() {
    return (
      <div className="container ">
        <div className="player-line-container">
          <div
            key={this.props.player.id}
            className="player-line"
            onClick={this.handleClick}
          >
            <h5>{this.props.player.name}</h5>
            {this.state.playerShown ? (
              <CaretUp id="caret" />
            ) : (
              <CaretDown id="caret" />
            )}
          </div>
          <div id="shownPlayer">
            {this.state.playerShown && (
              <ExpandedPlayer player={this.props.player} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Player;
