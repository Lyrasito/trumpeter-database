import React from "react";
import { render } from "@testing-library/react";
import Landing from "./Component/Index/Landing";
import { shallow, mount } from "enzyme";
import SearchBar from "./Component/Index/SearchBar";
import PlayerList from "./Component/Index/PlayerList";
import Player from "./Component/Index/Player";
import { expect } from "chai";
import sinon from "sinon";
var chai = require("chai");
//var sinon = require("sinon");
var sinonChai = require("sinon-chai");
//var expect = chai.expect;
chai.use(sinonChai);
const newAlbumArray = [
  {
    id: 1,
    title: "Fake Album",
    year: 1234,
    genre: "Fake Genre",
    image: "./FakeAlbum.jpg",
    playerId: 1,
  },
];
const newPlayerArray = [
  {
    id: 1,
    name: "Fake Player",
    city: "Fake City",
    startYear: 1234,
    endYear: 5678,
    image: "./FakePlayer.jpg",
    genres: ["Fake Genre"],
    albums: newAlbumArray,
  },
];

describe("Landing", () => {
  it.only("should render without errors", () => {
    shallow(<Landing />);
    console.log(process.env.DATABASE_DATABASE);
  });
  it.only("should render the title of the webpage and intro paragraph", () => {
    const wrapper = shallow(<Landing />);
    const title = <h1 className="title">Jazz Trumpeter Database</h1>;
    const intro = (
      <p className="intro-paragraph">
        Search for jazz trumpet players in the 20th and 21st centuries by name,
        or filter them by year, city, and/or genre.
      </p>
    );
    expect(wrapper.contains(title, intro)).to.equal(true);
  });
  it.only("should pass searchResults props to SearchBar", () => {
    const wrapper = mount(<SearchBar searchResults={newPlayerArray} />);
    expect(wrapper.props().searchResults).to.equal(newPlayerArray);
    //console.log(wrapper.getElements());
    const nameSearch = <h4 className="clicked">Search by name</h4>;
    expect(wrapper.contains(nameSearch)).to.equal(true);
  });
});
describe("SearchBar", () => {
  it.only("should change from nameSearch to search upon click", () => {
    const wrapper = shallow(<SearchBar searchResults={newPlayerArray} />);
    const nameSearch = wrapper.find(".nameSearch");
    const searchBar = wrapper.find(".searchBar");
    expect(wrapper.contains(nameSearch.getElements())).to.equal(true);
    wrapper.find(".clickable").simulate("click");
    expect(wrapper.contains(searchBar.getElements())).to.equal(true);
    expect(wrapper.contains(nameSearch.getElements())).to.equal(false);
  });
  it.only("should search for a player by name", () => {
    const wrapper = mount(<PlayerList players={newPlayerArray} />);
    //const SearchWrapper = wrapper.find(SearchBar).first();
    //console.log(SearchWrapper.getElements());
    //const nameSearch = SearchWrapper.find("#nameSearch");
    // nameSearch.simulate("change", { target: { value: "Fake" } });
    //const submit = SearchWrapper.find(".submit");
    //submit.simulate("click");
    //const PlayerListWrapper = wrapper.find(PlayerList);
    //console.log(wrapper.html());

    //Because there's an array of players in the players prop, this header will show up.
    const renderHeader = <h2>Players</h2>;
    expect(wrapper.contains(renderHeader)).to.equal(true);
    //the Players component is also rendered, and the name Fake Player shows up on the list of search results
    const renderedPlayer = <h5>Fake Player</h5>;
    expect(wrapper.contains(renderedPlayer)).to.equal(true);

    //When you click on the player's name, the caret changes from caret-down to caret-up
    const playerLine = wrapper.find(".player-line");
    playerLine.simulate("click");
    const caret = <svg id="caret">Caret-Up.svg</svg>;
    expect(wrapper.contains(caret)).to.equal(true);
    //console.log(wrapper.html());
  });
});

describe("Player", () => {
  it.only("should render info of the player clicked on", () => {
    //mount Player component with props of first object in player array, and album array
    const wrapper = mount(
      <Player player={newPlayerArray[0]} albums={newAlbumArray} />
    );
    //expect component to mount with the name of the Fake Player passed into props
    const playerName = <h1>Fake Player</h1>;
    expect(wrapper.contains(playerName)).to.equal(true);

    //stub getSpotify to avoid error thrown when Spotify link tries to render
    let getSpotifyStub = sinon
      .stub(Player.prototype, "getSpotify")
      .resolves("fakespotifylink.com");

    //click the button to show/hide albums
    const clickButton = wrapper.find(".clickButton");
    clickButton.simulate("click");
    //expect the id to change from #hiddenAlbums to #genreFilter after click, and expect the album to render with the title of the Fake Album passed into props
    const albumsShown = wrapper.find("#genreFilter");
    const albumsHidden = wrapper.find("#hiddenAlbums");
    const albumTitle = <h5 class="album-title">Fake Album </h5>;
    expect(wrapper.contains(albumsShown.getElements(), albumTitle));
    expect(wrapper.contains(albumsHidden)).to.equal(false);
  });
});
