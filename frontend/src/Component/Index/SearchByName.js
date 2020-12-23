import React from "react";
import { ReactComponent as SearchLogo } from "../../svg/Search.svg";

class SearchByName extends React.Component {
  state = {
    name: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  search = () => {
    this.props.searchByName(this.state.name);
    this.setState({ name: "" });
    this.props.haveSearched();
  };

  render() {
    return (
      <div className="nameSearch">
        <input
          id="nameSearch"
          name="name"
          onChange={this.handleChange}
          value={this.state.name}
        ></input>
        <br />

        <button className="submit" onClick={this.search}>
          Search
          <SearchLogo />
        </button>

        <br />
      </div>
    );
  }
}

export default SearchByName;
