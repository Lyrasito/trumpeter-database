import SearchByName from "../Component/Index/SearchByName";
import React from "react";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";

describe("<SearchByName />", () => {
  it("renders properly", () => {
    const wrapper = shallow(<SearchByName />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
