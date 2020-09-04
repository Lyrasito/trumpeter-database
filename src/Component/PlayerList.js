import React from "react";
import Players from "./Players";

class PlayerList extends React.Component {
  render() {
    return (
      <div>
        {this.props.players.map((player) => {
          return (
            <Players
              name={player.name}
              city={player.city}
              startYear={player.startYear}
              endYear={player.endYear}
              key={player.id}
            />
          );
        })}
      </div>
    );
  }
}

export default PlayerList;
