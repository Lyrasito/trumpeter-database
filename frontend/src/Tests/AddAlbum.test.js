import AddAlbum from "../Component/Edit/AddAlbum";
import React from "react";
import toJSON from "enzyme-to-json";
import { mount, shallow } from "enzyme";
import wait from "waait";
import { fakeAlbum, fakePlayers } from "../testUtils";
import Database from "../Database";

const players = fakePlayers();
const album = fakeAlbum();

Database.getPlayers = jest.fn().mockResolvedValue(players);
Database.getPlayerById = jest.fn().mockResolvedValue(players[0]);
Database.addAlbum = jest
  .fn()
  .mockResolvedValueOnce(album)
  .mockImplementation(() => {
    throw new Error("Please fill out all fields");
  });

describe("<AddAlbum />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<AddAlbum />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("adds an album to a player's library", async () => {
    const wrapper = mount(<AddAlbum />);
    const playerId = wrapper.find("[data-test='playerId']");
    const title = wrapper.find("[data-test='title']");
    const year = wrapper.find("[data-test='year']");
    const genre = wrapper.find("[data-test='genre']");
    const button = wrapper.find(".submit");

    playerId.simulate("change", { target: { value: players[0].id } });
    title.instance().value = album.title;
    title.simulate("change");
    year.instance().value = album.year;
    year.simulate("change");
    genre.instance().value = album.genre;
    genre.simulate("change");

    await wait();
    wrapper.update();

    button.simulate("click");

    await wait();
    wrapper.update();

    const message = wrapper.find("[data-test='success-message']");
    expect(message.text()).toBe(
      `You have added ${album.title} to the library of ${players[0].name}!`
    );
    expect(Database.addAlbum).toHaveBeenCalledWith(
      players[0].id,
      album.title,
      album.year,
      album.genre
    );
  });
  it("renders an error if called with insufficient input", async () => {
    const wrapper = mount(<AddAlbum />);
    const playerId = wrapper.find("[data-test='playerId']");
    playerId.simulate("change", { target: { value: players[0].id } });
    const button = wrapper.find(".submit");
    button.simulate("click");

    await wait();
    wrapper.update();
    const message = wrapper.find("[data-test='error-message']");
    expect(message.text()).toBe("Please fill out all fields");
  });
});
