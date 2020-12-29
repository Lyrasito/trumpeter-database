import React from "react";
import "./Albums.css";
import Album from "./Album";

class Albums extends React.Component {
  state = {
    albums: [],
    genre: "",
  };

  componentDidMount() {
    this.setState({ albums: this.props.albums });
  }

  getGenre = (event) => {
    this.setState({ genre: event.target.value });
  };

  filterByGenre = (genre) => {
    this.setState({ albums: this.props.albums });

    if (genre !== "noFilter") {
      const newAlbums = this.props.albums.filter(
        (album) => album.genre === genre
      );

      this.setState({ albums: newAlbums });
    }
  };

  render() {
    return (
      <div id="shownAlbums">
        <div className="albumFilter">
          <label>Filter by genre:</label>
          <select className="genreSelect" onChange={this.getGenre}>
            <option value="noFilter">No filter</option>
            {this.props.genres.map((genre, index) => {
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
            onClick={() => this.filterByGenre(this.state.genre)}
          >
            Filter
          </button>
        </div>
        <div className="albumList">
          {this.state.albums.map((album) => (
            <Album album={album} player={this.props.player} key={album.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Albums;

/*
 */
