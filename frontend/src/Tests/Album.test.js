import Album from "../Component/Index/Album";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
import wait from "waait";
import Spotify from "../Spotify";
import { fakePlayer, fakeAlbum } from "../testUtils";

const player = fakePlayer();
const album = fakeAlbum();

Spotify.searchAlbum = jest.fn().mockResolvedValue("fakespotifylink.com");

describe("<Album />", () => {
  it("renders properly", async () => {
    const wrapper = shallow(<Album player={player} album={album} />);
    await wait();
    wrapper.update();

    expect(wrapper.find("[href='fakespotifylink.com']")).toHaveLength(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
