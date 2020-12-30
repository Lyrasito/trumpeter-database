import SearchBar from "../Component/Index/SearchBar";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow, mount } from "enzyme";
import { fakePlayers } from "../testUtils";

const fakeResults = fakePlayers();

describe("<SearchBar />", () => {
  it("renders and matches snapshot", () => {
    const wrapper = shallow(<SearchBar searchResults={fakeResults} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
  it("changes the search from name to city/year/genre when clicked", () => {
    const wrapper = shallow(<SearchBar searchResults={fakeResults} />);

    expect(wrapper.find("SearchByName")).toHaveLength(1);
    expect(wrapper.find("SearchByCityYearGenre")).toHaveLength(0);

    const searchByCityYearGenre = wrapper.find(
      "[data-test='searchByCityYearGenre']"
    );
    searchByCityYearGenre.simulate("click");
    expect(wrapper.find("SearchByName")).toHaveLength(0);
    expect(wrapper.find("SearchByCityYearGenre")).toHaveLength(1);
  });
  it("renders no results if the search returned nothing", () => {
    const wrapper = shallow(<SearchBar searchResults={[]} />);
    wrapper.setState({ haveSearched: true });
    expect(wrapper.text()).toContain("Sorry, your search returned no results");
  });
});
