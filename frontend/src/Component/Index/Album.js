import React from "react";
import Spotify from "../../Spotify";

class Album extends React.Component {
  state = {
    link: "",
  };

  componentDidMount() {
    this.getAlbumLink();
  }

  getAlbumLink = async () => {
    let link = await Spotify.searchAlbum(
      `${this.props.album.title} ${this.props.player.name}`
    );
    this.setState({
      link,
    });
  };

  render() {
    const { album } = this.props;
    return (
      <div key={album.id} className="album">
        <img
          src={album.image ? album.image : "./img/album-default.png"}
          className="album-image"
          alt={album.title}
        />
        <h5 className="album-title">{album.title} </h5>{" "}
        <label>{album.year}</label>
        <br />
        <label>Genre: {album.genre}</label>
        <a
          href={this.state.link}
          className="link"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Open with Spotify</p>
        </a>
      </div>
    );
  }
}

export default Album;

//
