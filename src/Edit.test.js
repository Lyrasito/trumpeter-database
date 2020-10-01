import React from "react";
import { render } from "@testing-library/react";
import AddPlayer from "./Component/Edit/AddPlayer";
import Database from "./Database";
import { shallow, mount } from "enzyme";

import { expect } from "chai";
import sinon from "sinon";
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

const newPlayerArray = [
  {
    id: 1,
    name: "Fake Player",
    city: "Fake City",
    startYear: 1234,
    endYear: 5678,
    image: "./FakePlayer.jpg",
  },
];

describe("AddPlayer", () => {
  it("should render properly", () => {
    const wrapper = shallow(<AddPlayer />);
    const title = <h3 className="message">Add a player to the database!</h3>;
    expect(wrapper.contains(title));
  });
  it.only("should render a success message with successful addition", async () => {
    const wrapper = mount(<AddPlayer />);
    const newPlayerStub = sinon
      .stub(Database, "addPlayer")
      .resolves(newPlayerArray[0]);

    const setState = sinon.stub(AddPlayer.prototype, "setState");
    //const component = shallow(<Component />);

    //const setStateStub = sinon
    // .stub(AddPlayer.prototype, "setState")
    // .resolves({ newPlayer: newPlayerArray[0] });

    wrapper.find("button").simulate("click");
    await AddPlayer.prototype.addPlayer();
    //expect(setState).called.to.equal(true);
    console.log(wrapper.html());
    const message = (
      <h3 className="message">You have added Fake Player to the database!</h3>
    );
    //expect(wrapper.contains(message)).to.equal(true);
  });
  it("should render an error message with insufficient input", () => {
    const wrapper = shallow(<AddPlayer />);
    const newPlayerStub = sinon
      .stub(AddPlayer.prototype, "addPlayer")
      .throws({ name: "error", message: "Please fill out all fields" });
    const message = <h4 className="message">Please fill out all fields</h4>;
    //console.log(wrapper.html());
    //expect(wrapper.contains(message)).to.equal(true);
  });
});
