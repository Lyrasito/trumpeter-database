import AddPlayer from "../Component/Edit/AddPlayer";
import React from "react";
import toJSON from "enzyme-to-json";
import { mount, shallow } from "enzyme";
import wait from "waait";
import { fakePlayer } from "../testUtils";
import Database from "../Database";

const player = fakePlayer();
Database.addPlayer = jest
  .fn()
  .mockResolvedValueOnce(player)
  .mockImplementation(() => {
    throw new Error("Please fill out all fields");
  });

describe("<AddPlayer />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<AddPlayer />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("adds a player to the database", async () => {
    const wrapper = mount(<AddPlayer />);
    const name = wrapper.find("[data-test='name']");
    const city = wrapper.find("[data-test='city']");
    const startYear = wrapper.find("[data-test='startYear']");
    const endYear = wrapper.find("[data-test='endYear']");
    const button = wrapper.find(".submit");

    name.instance().value = player.name;
    name.simulate("change");
    city.instance().value = player.city;
    city.simulate("change");
    startYear.instance().value = player.startYear;
    startYear.simulate("change");
    endYear.instance().value = player.endYear;
    endYear.simulate("change");

    button.simulate("click");
    await wait();
    wrapper.update();

    expect(wrapper.find("[data-test='success-message']").text()).toBe(
      `You have added ${player.name} to the database!`
    );

    expect(Database.addPlayer).toHaveBeenCalledWith(
      player.name,
      player.city,
      player.startYear,
      player.endYear
    );
  });
  it("renders an error if called with insufficient input", async () => {
    const wrapper = mount(<AddPlayer />);
    const name = wrapper.find("[data-test='name']");
    const button = wrapper.find(".submit");
    name.instance().value = player.name;
    name.simulate("change");
    button.simulate("click");
    await wait();
    wrapper.update();
    expect(wrapper.find("[data-test='error-message']").text()).toBe(
      "Please fill out all fields"
    );
  });
});
