import React from "react";
import { render } from "@testing-library/react";
import AddPlayer from "./Component/Edit/AddPlayer";
import AddAlbum from "./Component/Edit/AddAlbum";
import Database from "./Database";
import { shallow, mount } from "enzyme";

import { expect } from "chai";
import sinon from "sinon";
var chai = require("chai");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
var sandbox = sinon.createSandbox();

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

const newAlbumArray = [
  {
    id: 1,
    title: "Fake Album",
    year: 1234,
    genre: "Fake Genre",
    image: "./FakeAlbum.jpg",
    playerId: 1,
  },
];

describe("AddPlayer", () => {
  //beforeEach(() => {});
  afterEach(() => {
    sandbox.restore();
    //wrapper.unmount();
  });
  it("should render properly", () => {
    const wrapper = shallow(<AddPlayer />);
    const title = <h3 className="message">Add a player to the database!</h3>;
    expect(wrapper.contains(title));
  });
  it("should render a success message with successful addition", (done) => {
    const wrapper = mount(<AddPlayer />);
    const newPlayerStub = sandbox
      .stub(Database, "addPlayer")
      .resolves(newPlayerArray[0]);

    wrapper.find("button").simulate("click");

    expect(newPlayerStub).to.have.been.calledOnce;
    process.nextTick(() => {
      wrapper.update();
      //console.log(wrapper.html());

      const message = (
        <h3 className="message">You have added Fake Player to the database!</h3>
      );
      expect(wrapper.contains(message)).to.equal(true);
      done();
    });
  });
  it("should render an error message with insufficient input", (done) => {
    const wrapper = shallow(<AddPlayer />);
    const newPlayerStub = sandbox
      .stub(Database, "addPlayer")
      .rejects({ name: "error", message: "Please fill out all fields" });
    wrapper.find("button").simulate("click");
    expect(newPlayerStub).to.have.been.calledOnce;
    process.nextTick(() => {
      wrapper.update();
      const message = <h4 className="message">Please fill out all fields</h4>;
      expect(wrapper.contains(message)).to.equal(true);
      done();
    });
  });
});

describe("AddAlbum", () => {
  afterEach(() => {
    sandbox.restore();
  });
  it("should render properly", () => {
    const wrapper = shallow(<AddAlbum />);
    const title = (
      <h3 className="message">Add an album to a player's libary!</h3>
    );
    expect(wrapper.contains(title));
  });
  it("Should render a success message after adding an album", (done) => {
    const wrapper = mount(<AddAlbum />);

    const getPlayerIdStub = sandbox
      .stub(Database, "getPlayerById")
      .resolves(newPlayerArray[0]);

    const newAlbumStub = sandbox
      .stub(Database, "addAlbum")
      .resolves(newAlbumArray[0]);

    wrapper.find("#players").simulate("change");
    wrapper.find("button").simulate("click");

    expect(getPlayerIdStub).to.have.been.calledOnce;
    expect(newAlbumStub).to.have.been.calledOnce;
    process.nextTick(() => {
      wrapper.update();
      const message = (
        <h3 className="message">
          You have added Fake Album to the library of Fake Player!
        </h3>
      );
      expect(wrapper.contains(message)).to.equal(true);
      done();
    });
  });
  it("should render an error message with insufficient input", (done) => {
    const wrapper = shallow(<AddAlbum />);

    const newAlbumStub = sandbox
      .stub(Database, "addAlbum")
      .rejects({ name: "error", message: "Please fill out all fields" });

    wrapper.find("button").simulate("click");

    process.nextTick(() => {
      wrapper.update();
      const message = <h4 className="message">Please fill out all fields</h4>;
      expect(wrapper.contains(message)).to.equal(true);
      done();
    });
  });
});
