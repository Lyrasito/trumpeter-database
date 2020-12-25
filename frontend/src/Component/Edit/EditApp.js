import React from "react";
import AddPlayer from "./AddPlayer";
import AddAlbum from "./AddAlbum";
import "./EditApp.css";
import { Link } from "react-router-dom";
class EditApp extends React.Component {
  render() {
    return (
      <div>
        <div className="edit-container">
          <div className="addPlayer">
            <AddPlayer />
          </div>
          <AddAlbum />
          <div className="backButton">
            <Link to="/">
              <button className="add">Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EditApp;
