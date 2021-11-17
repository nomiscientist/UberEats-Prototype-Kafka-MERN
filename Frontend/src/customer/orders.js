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
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [skip, setSkip] = useState(0);

  let pageOptions = [2, 5, 10];

  const showOptions = () => {
    let options = pageOptions.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    return options;
  };

  const getReceiptDetails = async (orderId) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getReceiptDetails`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.token,
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
    "Cancelled",
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
    setSkip(0);
  };

  const onChangeResultsSizeHandler = (event) => {
    setSkip(0);
    setResultsPerPage(event.target.value);
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

  const onClickCancelHandler = async (orderId) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/updateOrderStatus`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: session.token,
        },
        body: JSON.stringify({
          orderId: orderId,
          orderStatus: "Cancelled",
        }),
      }
    );
    const data = await response.json();
    getPastOrders();
  };

  const displayOrders = () => {
    return ordersList?.length > 0 ? (
      ordersList.map((pastOrder) => {
        return (
          <Row>
            {" "}
            <ListGroup.Item>
              <Col>
                <h4>{pastOrder.restaurantName}</h4>
                <h6>Order Status: {pastOrder.finalStatus}</h6>
                <Button
                  variant="success"
                  disabled={pastOrder.finalStatus !== "New Order"}
                  onClick={() => onClickCancelHandler(pastOrder._id)}
                >
                  Cancel Order
                </Button>
              </Col>
              <Col>
                {formatTextForOrders(
                  pastOrder.dateOrdered,
                  pastOrder.totalQuantity,
                  pastOrder.totalPrice
                )}
              </Col>
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(pastOrder._id)}
                >
                  View Reciept
                </Button>
              </Col>
              <ReceiptModal
                receiptModalShow={receiptModalShow}
                specialInstructions={pastOrder.specialInstructions}
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
          Authorization: session.token,
        },
        body: JSON.stringify({
          customerId: session.primaryID,
          orderStatus: orderFilter,
          skip: skip,
          take: resultsPerPage,
        }),
      }
    );
    const data = await response.json();

    setOrdersList(data);
  };

  const onPrevClickHandler = () => {
    setSkip((prev) => {
      return prev - parseInt(resultsPerPage);
    });
  };

  const onNextClickHandler = () => {
    setSkip((prev) => {
      return prev + parseInt(resultsPerPage);
    });
  };

  useEffect(() => {
    getPastOrders();
  }, [orderFilter, skip, resultsPerPage]);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={5}>
          <font size="7">Past Orders</font>
        </Col>
        <Col md={2}>
          <Form.Group required as={Col}>
            <Form.Label>Results per page</Form.Label>
            <Form.Control
              name="quantity"
              as="select"
              defaultValue={resultsPerPage}
              htmlSize={1}
              custom
              type="number"
              onChange={onChangeResultsSizeHandler}
            >
              {showOptions()}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Button
            variant="outline-dark"
            disabled={skip === 0}
            onClick={onPrevClickHandler}
          >
            Prev
          </Button>

          <Button
            disabled={ordersList.length === 0}
            variant="outline-dark"
            onClick={onNextClickHandler}
          >
            Next
          </Button>
        </Col>
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
