import PlayerList from "../Component/Index/PlayerList";
import React from "react";
import { shallow, mount } from "enzyme";
import { fakePlayers } from "../testUtils";

describe("<PlayerList />", () => {
  it("renders the title and players map when passed an array of players", () => {
    const wrapper = shallow(<PlayerList players={fakePlayers()} />);
    expect(wrapper.text()).toContain("Players");
    expect(wrapper.find("h2")).toHaveLength(1);
    expect(wrapper.find(".player-list")).toHaveLength(1);
  });
  it("renders nothing when passed an empty array", () => {
    const wrapper = shallow(<PlayerList players={[]} />);
    expect(wrapper.find("h2")).toHaveLength(0);
    expect(wrapper.find(".player-list")).toHaveLength(0);
  });
});
