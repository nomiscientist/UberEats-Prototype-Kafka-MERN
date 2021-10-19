import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Modal,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { getSessionCookie } from "../common/session";
import useCartCheckoutModal from "../common/useCartCheckoutModal";
import { useHistory } from "react-router-dom";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const Checkout = () => {
  const [address, setAddress] = useState("");
  let deliveryAddress;
  const session = getSessionCookie();
  const [subTotal, setSubTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newSelectedAddress, setNewSelectedAddress] = useState("");

  const [deliveryType, setDeliveryType] = useState("delivery");

  const history = useHistory();
  const handleClose = () => {
    setShow(false);
    window.sessionStorage.removeItem("restaurantId");
    history.replace("/restaurantSearch");
  };

  const [tip, setTip] = useState(0);
  const deliveryFee = 2.5;
  const tax = 3.5;
  const { getCartDetails, displaySelectedItems, restaurantName } =
    useCartCheckoutModal();

  const getDeliveryType = async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getDeliveryType?customerId=${session.primaryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      setDeliveryType(data.deliveryType);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeliveryType();
  }, []);

  const getDeliveryAddress = async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getDeliveryAddress?customerId=${session.primaryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      deliveryAddress =
        data.addressLine1 + ", " + data.addressLine2 + ", " + data.city;

      setAddress(deliveryAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const showOrderTotal = React.useCallback(async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getOrderTotal?customerId=${session.primaryID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setSubTotal(data.subTotal);
      setTotalItems(data.totalItems);
    } catch (error) {
      console.log(error);
    }
  }, [session.primaryID]);

  const onTipPercentChangeHandler = (event) => {
    event.preventDefault();
    let tipValue = event.target.value;
    tipValue = tipValue / 100;
    setTip(tipValue * subTotal);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      (selectedAddress.length > 4 && deliveryType === "delivery") ||
      deliveryType === "pickup"
    ) {
      try {
        const response = await fetch(
          `http://${NODE_HOST}:${NODE_PORT}/bookOrder`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: session.primaryID,
              totalPrice: subTotal + tip + tax + deliveryFee,
              totalItems: totalItems,
            }),
          }
        );

        const data = await response.json();
        if (data.Message) {
          setShow(true);
        }
        setSubTotal(0);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert(
        "Please enter valid delivery address and click confirm address button if you are adding a new delivery address to place your order"
      );
    }
  };

  // const onAddressChangeHandler = (event) => {
  //   event.preventDefault();
  //   setSelectedAddress(event.target.value);
  // };

  const onNewAddressChangeHandler = (event) => {
    event.preventDefault();
    setNewSelectedAddress(event.target.value);
  };

  const onSumbitHandler = async (event) => {
    event.preventDefault();

    //API call to add delievry address to order table

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/addDeliveryAddress`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: session.primaryID,
            address: newSelectedAddress,
          }),
        }
      );

      const data = await response.json();
      setSelectedAddress(newSelectedAddress);
    } catch (error) {
      console.log(error);
    }
  };

  //

  const showOrderBookedModal = () => {
    return show ? (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Order Placed successfully! </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    ) : (
      <div></div>
    );
  };

  useEffect(() => {
    showOrderTotal();
  }, [subTotal, tip, showOrderTotal, displaySelectedItems]);

  useEffect(() => {
    getCartDetails();
  }, []);

  useEffect(() => {
    getDeliveryAddress();
  }, []);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={7}>
          <Card>
            <Form onSubmit={onSumbitHandler}>
              <Card.Header>
                Your Items
                <Row>{restaurantName}</Row>
              </Card.Header>
              <Card.Body> {displaySelectedItems()} </Card.Body>
              <Card.Footer>
                <Form.Group as={Col}>
                  <Form.Label>Select from below Delivery Address</Form.Label>
                  <Form.Select
                    name="deliveryAddress"
                    as="select"
                    custom
                    onChange={onNewAddressChangeHandler}
                  >
                    <option>..</option>
                    <option>{address}</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Add a new Delivery Address</Form.Label>
                  <Form.Control
                    name="deliveryAddressNew"
                    onChange={onNewAddressChangeHandler}
                  ></Form.Control>
                </Form.Group>
                <Button variant="dark" type="submit">
                  Confirm Address
                </Button>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
        <Col md={5}>
          <Card>
            <Form onSubmit={onSubmitHandler}>
              <Card.Header>
                <font size="4">
                  <Row className="mt-4">
                    <Button variant="success" type="submit">
                      Place Order
                    </Button>
                    {showOrderBookedModal()}
                  </Row>
                </font>
                <Form.Text id="generalMessage" muted>
                  If you are not around when the delivery person arrives, they
                  will leave your order at the door. By placing you order you
                  agree to take full responsibility of it once it is delivered.
                </Form.Text>
              </Card.Header>
              <Card.Body className="mt-3">
                <Row>
                  <Col>Subtotal</Col>
                  <Col></Col>
                  <Col>${subTotal.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col> Delivery Fee</Col>
                  <Col></Col>
                  <Col>${deliveryFee.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col> Taxes</Col>
                  <Col></Col>
                  <Col>${tax.toFixed(2)}</Col>
                </Row>
                <Row>
                  <Col>Add Tip %</Col>
                  <Col>
                    <Form.Select
                      name="tip"
                      size="sm"
                      onChange={onTipPercentChangeHandler}
                    >
                      <option value="0">0</option>
                      <option value="15">15</option>
                      <option value="18">18</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </Form.Select>
                  </Col>
                  <Col>${tip.toFixed(2)}</Col>
                  <Form.Text id="generalMessage" muted>
                    Add a tip to say thanks to the delivery people
                  </Form.Text>
                </Row>
              </Card.Body>
              <Card.Footer className="mt-4">
                <font size="5">
                  <Row>
                    <Col> Total</Col>
                    <Col>
                      ${(deliveryFee + tip + subTotal + tax).toFixed(2)}
                    </Col>
                  </Row>
                </font>
              </Card.Footer>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
