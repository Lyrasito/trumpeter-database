import React from "react";
import Players from "./Players";
import "./PlayerList.css";

class PlayerList extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
  }

  renderHeader() {
    if (this.props.players.length > 0) {
      return <h2>Players</h2>;
    }
  }

  render() {
    return (
      <div className="player-list">
        {this.renderHeader()}
        {this.props.players.map((player) => {
          return <Players player={player} key={player.id} />;
        })}
      </div>
    );
  }
}

export default PlayerList;
