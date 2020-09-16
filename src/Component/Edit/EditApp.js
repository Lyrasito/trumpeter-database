import React from "react";
import Database from "../../Database";
import AddPlayer from "./AddPlayer";
import AddAlbum from "./AddAlbum";
class EditApp extends React.Component {
  render() {
    return (
      <div>
        <AddPlayer />
        <AddAlbum />
      </div>
    );
  }
}

export default EditApp;
