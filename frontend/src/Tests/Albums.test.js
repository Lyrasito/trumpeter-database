import Albums from "../Component/Index/Albums";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";
import { fakePlayer, fakeAlbums, fakeGenres } from "../testUtils";

const player = fakePlayer();
const genres = fakeGenres();
const albums = fakeAlbums();

describe("<Albums />", () => {
  it("renders properly", () => {
    const wrapper = shallow(
      <Albums albums={albums} genres={genres} player={player} />
    );
    expect(wrapper.find("Album")).toHaveLength(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("filters rendered <Album />s by genre and removes the filter if 'No filter' is selected", async () => {
    const wrapper = shallow(
      <Albums albums={albums} genres={genres} player={player} />
    );
    const filter = wrapper.find(".genreSelect");
    filter.simulate("change", { target: { value: genres[0] } });
    const button = wrapper.find(".filterButton");
    button.simulate("click");
    const album = wrapper.find("Album");
    expect(album).toHaveLength(1);
    expect(album.props().album.genre).toEqual(genres[0]);

    filter.simulate("change", { target: { value: "noFilter" } });
    button.simulate("click");
    const album1 = wrapper.find("Album");
    expect(album1).toHaveLength(2);
  });
});
