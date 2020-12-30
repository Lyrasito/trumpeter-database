import ExpandedPlayer from "../Component/Index/ExpandedPlayer";
import React from "react";
import { shallow } from "enzyme";
import wait from "waait";
import Database from "../Database";
import { fakePlayer, fakeAlbums, fakeGenres } from "../testUtils";

const player = fakePlayer();
const genres = fakeGenres();
const albums = fakeAlbums();

Database.getPlayerAlbums = jest.fn().mockResolvedValue(albums);
Database.getPlayerGenres = jest.fn().mockResolvedValue(genres);

describe("<ExpandedPlayer />", () => {
  it("renders properly", async () => {
    const wrapper = shallow(<ExpandedPlayer player={player} />);

    await wait();
    wrapper.update();

    const name = wrapper.find("h1");
    const cityGenres = wrapper.find(".city-genres");
    expect(name.text()).toContain(player.name);
    expect(cityGenres.text()).toContain(genres[0], genres[1]);
  });
  it("renders an <Albums/> component when clicked", async () => {
    const wrapper = shallow(<ExpandedPlayer player={player} />);
    await wait();
    wrapper.update();
    const button = wrapper.find(".clickButton");
    button.simulate("click");
    const Albums = wrapper.find("Albums");

    expect(Albums.props().albums).toEqual(albums);
    expect(Albums.props().player).toEqual(player);
    expect(Albums.props().genres).toEqual(genres);
  });
});
