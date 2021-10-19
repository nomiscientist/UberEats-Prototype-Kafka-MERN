import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { getSessionCookie } from "./session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const useCartCheckoutModal = (modalShow, onHide) => {
  const [cartDetails, setCartDetails] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  let totalAmount = 0.0;

  let restaurantName = "Your Cart is empty!!";
  const session = getSessionCookie();
  const history = useHistory();

  if (!session.restaurantFlag && cartDetails.length > 0) {
    restaurantName = cartDetails[0].RestaurantName;
  }

  const displaySelectedItems = () => {
    return cartDetails.map((item, key) => {
      return (
        <Row>
          <Col md={4}>{item.FoodName}</Col>
          <Col md={5}></Col>
          <Col md={3}> {`$${(item.Price * item.Quantity).toFixed(2)}`}</Col>
          {populateQuantityDropdown(item.Quantity, key)}
        </Row>
      );
    });
  };

  const onQuantityChangeHandler = async (value, key) => {
    let requestObj = { ...cartDetails[key] };
    requestObj.Quantity = value;

    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/updateCartOrderDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestObj),
        }
      );
      const data = await response.json();

      setCartDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    history.push("/checkout");
  };

  const calculateTotal = () => {
    cartDetails.forEach((element) => {
      totalAmount += element.Amount;
    });
    setCartTotal(totalAmount);
  };

  useEffect(() => calculateTotal(), [cartDetails]);
  useEffect(() => buttonDisplay(), [cartTotal]);

  const increment = (value, key) => {
    onQuantityChangeHandler(value + 1, key);
  };

  const decrement = (value, key) => {
    if (value >= 1) onQuantityChangeHandler(value - 1, key);
  };

  const populateQuantityDropdown = (dishQuantity, key) => {
    return (
      <Row>
        <Col md={1}>
          <BiPlus
            type="button"
            style={{ color: "white", backgroundColor: "black" }}
            onClick={(e) => increment(dishQuantity, key)}
          />
        </Col>
        <Col md={1}></Col>
        <Col md={2}>
          <Form>
            <Form.Text>{dishQuantity}</Form.Text>
          </Form>
        </Col>
        <Col md={1}>
          <BiMinus
            type="button"
            style={{ color: "white", backgroundColor: "black" }}
            onClick={(e) => decrement(dishQuantity, key)}
          />
        </Col>
      </Row>
    );
  };

  const getCartDetails = async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/showCartDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: session.primaryID,
          }),
        }
      );
      const data = await response.json();
      setCartDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  const buttonDisplay = () => {
    if (cartTotal === 0) setbuttonDisabled(true);
    else setbuttonDisabled(false);
  };

  const cartModal = () => {
    return (
      <Modal
        show={modalShow}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        variant="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {restaurantName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body variant="dark">
          <Container>{displaySelectedItems()}</Container>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={onSubmitHandler}>
            <Button
              variant="dark"
              type="submit"
              onClick={onHide}
              disabled={buttonDisabled}
            >
              Go to checkout : ${cartTotal.toFixed(2)}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    );
  };

  return {
    cartModal,
    getCartDetails,
    displaySelectedItems,
    restaurantName,
    cartDetails,
  };
};

export default useCartCheckoutModal;
