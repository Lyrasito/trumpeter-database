import React from "react";
import Player from "./Player";
import "./PlayerList.css";

const PlayerList = (props) => (
  <div className="player-list-container">
    {props.players.length > 0 ? <h2>Players</h2> : null}
    {props.players.length > 0 && (
      <div className="player-list">
        {props.players.map((player) => (
          <Player player={player} key={player.id} />
        ))}
      </div>
    )}
  </div>
);

export default PlayerList;
