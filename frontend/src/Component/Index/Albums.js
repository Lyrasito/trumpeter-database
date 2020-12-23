//props: album, player

import React from "react";
import "./Albums.css";
import Spotify from "../../Spotify";
import Album from "./Album";

class Albums extends React.Component {
  state = {
    albumLinks: [],
    genre: "",
  };

  componentDidMount() {
    this.getAlbumLinks();
  }

  getSpotify = async (term) => {
    const link = await Spotify.searchAlbum(term);
    return link;
  };

  getAlbumLinks = async () => {
    for (let i = 0; i < this.props.albums.length; i++) {
      let link = await this.getSpotify(
        `${this.props.albums[i].title} ${this.props.player.name}`
      );
      let links = this.state.albumLinks;
      links.push(link);
      this.setState({
        albumLinks: links,
      });
    }
  };

  getGenre = (event) => {
    this.setState({ genre: event.target.value });
  };
  filterByGenre = () => {
    this.props.filterByGenre(this.state.genre);
  };
  render() {
    return (
      <div id="shownAlbums">
        <div className="albumFilter">
          <label>Filter by genre:</label>
          <select className="genreSelect" onChange={this.getGenre}>
            <option value="noFilter">No filter</option>
            {this.props.player.genres.map((genre, index) => {
              return (
                <option value={genre} key={index}>
                  {genre}
                </option>
              );
            })}
          </select>
          <button
            type="submit"
            className="filterButton"
            onClick={this.filterByGenre}
          >
            Filter
          </button>
        </div>
        <div className="albumList">
          {this.props.albums.map((album, index) => (
            <Album
              album={album}
              albumLink={this.state.albumLinks[index]}
              key={album.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Albums;

/*
 */
