import React from "react";
import { mount } from "enzyme";
import Header from "../components/Header/Header";

const onMenuClickFn = jest.fn();

describe("Header", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Header title="Web Application" onMenuClick={onMenuClickFn} />
    );
  });

  it("title should match", () => {
    expect(wrapper.find("h6#title-label")).toHaveText("Web Application");
  });

  it("burger-menu should have been clicked", () => {
    wrapper.find("button#burger-menu").simulate("click");
    expect(onMenuClickFn).toHaveBeenCalled();
  });

  it("burger-menu should have been clicked twice", () => {
    wrapper
      .find("button#burger-menu")
      .simulate("click")
      .simulate("click");
    expect(onMenuClickFn).toHaveBeenCalledTimes(3);
  });
});
