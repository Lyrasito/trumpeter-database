import React from "react";
import Database from "../../Database";
import AddPlayer from "./AddPlayer";
import AddAlbum from "./AddAlbum";
import "./EditApp.css";
import { Link, HashRouter as Router } from "react-router-dom";
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
            <Router>
              <Link to="/">
                <button className="add">Back</button>
              </Link>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default EditApp;
