import SearchByCityYearGenre from "../Component/Index/SearchByCityYearGenre";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";

describe("<SearchByCityYearGenre />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<SearchByCityYearGenre />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
