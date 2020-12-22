import React from "react";

const Album = (props) => {
  const { album } = props;
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
        href={props.albumLink}
        className="link"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Open with Spotify</p>
      </a>
    </div>
  );
};

export default Album;

//
