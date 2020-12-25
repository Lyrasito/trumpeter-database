import Landing from "../Component/Index/Landing";
import React from "react";
import { shallow } from "enzyme";

describe("<Landing/>", () => {
  it.only("renders properly", () => {
    const wrapper = shallow(<Landing />);

    const title = wrapper.find(".title");
    const intro = wrapper.find(".intro-paragraph");
    const addButton = wrapper.find(".add");
    expect(title.text()).toBe("Jazz Trumpeter Database");
    expect(intro.text()).toContain("Search for jazz trumpet players");
    expect(addButton.text()).toBe("Add to Database");
  });
});
