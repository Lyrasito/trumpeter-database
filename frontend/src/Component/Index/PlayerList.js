import React from "react";
import Players from "./Players";
import "./PlayerList.css";

const PlayerList = (props) => (
  <div className="player-list-container">
    {props.players.length > 0 ? <h2>Players</h2> : null}
    <div className={props.players.length > 0 ? "player-list" : "no-players"}>
      {props.players.map((player) => {
        return <Players player={player} key={player.id} />;
      })}
    </div>
  </div>
);

export default PlayerList;
