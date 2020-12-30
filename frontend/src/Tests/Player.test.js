import Player from "../Component/Index/Player";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
import wait from "waait";
import Database from "../Database";
import { fakePlayer, fakeGenres } from "../testUtils";

describe("<Player />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<Player player={fakePlayer()} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("renders an <ExpandedPlayer/> component when a player is clicked", async () => {
    const wrapper = shallow(<Player player={fakePlayer()} />);
    Database.getPlayerGenres = jest.fn().mockResolvedValue(fakeGenres());

    const playerLine = wrapper.find(".player-line");
    playerLine.simulate("click");
    await wait();
    wrapper.update();
    expect(wrapper.find("ExpandedPlayer")).toHaveLength(1);
  });
});
