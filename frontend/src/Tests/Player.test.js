import Player from "../Component/Index/Player";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import wait from "waait";
import Database from "../Database";

const fakePlayer = {
  id: 1,
  name: "Fake Player",
  city: "Fake City",
  startYear: 1234,
  endYear: 5678,
};

describe("<Player />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<Player player={fakePlayer} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("renders a <Player/> component when a player is clicked", async () => {
    const wrapper = shallow(<Player player={fakePlayer} />);
    Database.getPlayerGenres = jest
      .fn()
      .mockResolvedValue(["fakeGenre1", "fakeGenre2"]);
    Database.getPlayerAlbums = jest
      .fn()
      .mockResolvedValue([
        { id: 1, title: "Fake Album", year: 1234, genre: "fakeGenre1" },
      ]);
    const playerLine = wrapper.find(".player-line");
    playerLine.simulate("click");
    await wait();
    wrapper.update();
    expect(wrapper.find("Player")).toHaveLength(1);
  });
});
