import enableHooks from "jest-react-hooks-shallow";

import * as React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CustomerLogin from "./customerLogin.js";
import { Form, Button } from "react-bootstrap";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

configure({ adapter: new Adapter() });

enableHooks(jest);

describe("CustomerLogin: When the user is logged in testing form components", () => {
  let container;
  const wrapper = shallow(
    <div>
      <CustomerLogin />
    </div>
  );
  beforeEach(() => {
    container = wrapper.find("CustomerLogin").dive();
  });
  it("the emailId should be rendered", () => {
    container
      .find(Form.Control)
      .at(0)
      .simulate("change", {
        target: {
          value: "123",
        },
      });

    expect(container.find(Form.Control).at(0)).toHaveLength(1);
    expect(container.find(Form.Control).at(0).prop("name")).toBe("emailId");
  });
  it("the password should be rendered", () => {
    container
      .find(Form.Control)
      .at(0)
      .simulate("change", {
        target: {
          value: "456",
        },
      });

    expect(container.find(Form.Control).at(1)).toHaveLength(1);
    expect(container.find(Form.Control).at(1).prop("name")).toBe("password");
  });
  it("the submit button should not be clicked", () => {
    container
      .find(Form.Control)
      .at(0)
      .simulate("change", {
        target: {
          value: "456",
        },
      });
    expect(container.find(Button).at(1)).toHaveLength(1);
    expect(container.find(Button).at(1).prop("type")).toBe("submit");
  });
});
