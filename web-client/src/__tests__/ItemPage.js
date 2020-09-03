import React from "react";
import { shallow, mount } from "enzyme";
import { ItemPage } from "../scenes/item";
import { MemoryRouter as Router } from "react-router-dom";
import * as itemActions from "../actions/items";

const data = {
  id: 1,
  name: "kambing"
};
itemActions.findById = jest.fn().mockReturnValue(data);
describe("ItemPage", () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount(
      <Router>
        <ItemPage match={{ params: { id: 1 } }} />
      </Router>
    );
  });
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<ItemPage debug />);
    expect(component).toMatchSnapshot();
  });

  it("should have data ", () => {
    const component = wrapper.find("ItemPage");
    expect(component.state("id")).toEqual(data.id);

    expect(component.state("name")).toEqual(data.name);
  });
});
