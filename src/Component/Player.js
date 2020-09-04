import React from "react";

class Player extends React.Component {
  render() {
    return (
      <div>
        <h1>Name: {this.props.name}</h1>
        <h2>City: {this.props.city}</h2>
        <h2>
          Career Span: {this.props.startYear}-{this.props.endYear}
        </h2>
      </div>
    );
  }
}

export default Player;
