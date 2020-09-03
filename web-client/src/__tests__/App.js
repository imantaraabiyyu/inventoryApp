import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import routes from "../configs/routes";

describe("App", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);
    expect(component).toMatchSnapshot();
  });

  it("should have N route(s)", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("Route")).toHaveLength(routes.length);
  });
});
