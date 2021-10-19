import enableHooks from "jest-react-hooks-shallow";

import * as React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReceiptModal from "./receiptModal.js";
import { Row, Modal } from "react-bootstrap";

configure({ adapter: new Adapter() });

enableHooks(jest);

describe("Receipt Modal: When the user is logged in testing form components", () => {
  let container;

  it("the modal title should be rendred with specified header and total of 2 rows in component", () => {
    const props = {
      receiptDetails: [{ quantity: 1, foodName: "Burger" }],
      header: "The Modal header",
    };
    const wrapper = shallow(
      <div>
        <ReceiptModal {...props} />
      </div>
    );
    container = wrapper.find("ReceiptModal").dive();

    expect(container.find(Modal.Title).text()).toBe("The Modal header");
    expect(container.find(Row)).toHaveLength(2);
  });

  it("the modal title should be rendred with specified header", () => {
    const props = {
      receiptDetails: [
        { quantity: 1, foodName: "Burger", price: 23 },
        { quantity: 2, foodName: "Pizza" },
      ],
    };
    const wrapper = shallow(
      <div>
        <ReceiptModal {...props} />
      </div>
    );
    container = wrapper.find("ReceiptModal").dive();

    expect(container.find(Modal.Title).text()).toBe("");
    expect(container.find(Row)).toHaveLength(3);
    expect(container.find(Row).at(1).childAt(1).text()).toBe("Burger");
  });
});
