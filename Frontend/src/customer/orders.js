import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getSessionCookie } from "../common/session";
import ReceiptModal from "./receiptModal";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const Orders = (props) => {
  const session = getSessionCookie();
  const [orderFilter, setOrderFilter] = useState("");

  const [ordersList, setOrdersList] = useState([]);

  const [receiptModalShow, setReceiptModalShow] = useState(false);

  const [receiptDetails, setReceiptDetails] = useState([]);

  const getReceiptDetails = async (orderId) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getReceiptDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId,
        }),
      }
    );
    const data = await response.json();
    setReceiptDetails(data);
  };

  let orderFilterOptions = [
    "",
    "New Order",
    "Order Received",
    "Preparing",
    "On the way",
    "Delivered",
    "Pick up Ready",
    "Picked up",
  ];
  const options = orderFilterOptions.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const onChangeHandler = (event) => {
    setOrderFilter(event.target.value);
  };

  const formatTextForOrders = (date, quantity, price) => {
    let parseDate = new Date(date);
    return parseDate ? (
      <p>{`${quantity} items for $${price} on ${parseDate.toLocaleString(
        "en-US",
        { timeZone: "PST" }
      )}`}</p>
    ) : (
      <p>{`${quantity} items for $${price}`}</p>
    );
  };

  const onClickHandler = (orderId) => {
    setReceiptModalShow(true);
    getReceiptDetails(orderId);
  };

  const displayOrders = () => {
    return ordersList?.length > 0 ? (
      ordersList.map((pastOrder) => {
        return (
          <Row>
            {" "}
            <ListGroup.Item>
              <Col>
                <h5>{pastOrder.restaurantName}</h5>
              </Col>
              <Col>
                {formatTextForOrders(
                  pastOrder.dateOrdered,
                  pastOrder.totalItems,
                  pastOrder.totalPrice
                )}
              </Col>
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(pastOrder.orderId)}
                >
                  View Reciept
                </Button>
              </Col>
              <ReceiptModal
                receiptModalShow={receiptModalShow}
                onHide={() => setReceiptModalShow(false)}
                receiptDetails={receiptDetails}
                header={"Receipt"}
              />
            </ListGroup.Item>
          </Row>
        );
      })
    ) : (
      <ListGroup.Item>
        <h5>No Orders Found !!</h5>
      </ListGroup.Item>
    );
  };

  const getPastOrders = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getPastOrders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: session.primaryID,
          orderStatus: orderFilter,
        }),
      }
    );
    const data = await response.json();
    setOrdersList(data);
  };

  useEffect(() => {
    getPastOrders();
  }, [orderFilter]);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>Past Orders</Col>
        <Col>
          <Form>
            <Form.Group as={Col}>
              <Form.Label>Order Filters</Form.Label>
              <Form.Control
                name="orderFilterSelected"
                placeholder="Order Filters"
                as="select"
                onChange={onChangeHandler}
              >
                {options}
              </Form.Control>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <ListGroup>{displayOrders()}</ListGroup>
    </Container>
  );
};

export default Orders;
