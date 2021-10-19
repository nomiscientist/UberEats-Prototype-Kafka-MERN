import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getSessionCookie } from "../common/session";
import ReceiptModal from "../customer/receiptModal";
import CustomerModal from "./customerModal";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
const deliveryTypeOptions = [
  "",
  "Order Received",
  "Preparing",
  "On the way",
  "Delivered",
];
const pickupTypeOptions = [
  "",
  "Order Received",
  "Preparing",
  "Pick up Ready",
  "Picked up",
];

const orderFilterOptions = ["", "New Order", "Delivered", "Cancelled"];

export const checkDeliveryStatusOptions = (deliveryType) => {
  return deliveryType === "delivery"
    ? deliveryTypeOptions.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      })
    : pickupTypeOptions.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        );
      });
};

const RestaurantOrders = () => {
  const session = getSessionCookie();
  const [restaurantOrdersList, setRestaurantOrdersList] = useState([]);
  const [orderFilter, setOrderFilter] = useState("");
  const [detailsModalShow, setDetailsModalShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const [customerDetailsModalShow, setCustomerDetailsModalShow] =
    useState(false);
  const [customerDetails, setCustomerDetails] = useState([]);

  const [orderStatus, setOrderStatus] = useState([]);

  const options = orderFilterOptions.map((item) => {
    return (
      <option key={item} value={item}>
        {item}
      </option>
    );
  });

  const onOrderStatusChangeHandler = (event, orderId) => {
    setOrderStatus((prevState) => {
      let indexElement = -1;
      prevState.forEach((order, index) => {
        if (order.orderId === orderId) {
          indexElement = index;
        }
      });
      let newState = [...prevState];
      if (indexElement === -1) {
        newState.push({ orderId: orderId, orderStatus: event.target.value });
      } else {
        newState[indexElement] = {
          orderId: orderId,
          orderStatus: event.target.value,
        };
      }
      return newState;
    });
  };

  const getRestaurantOrders = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/getRestaurantOrders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: session.primaryID,
          orderStatus: orderFilter,
        }),
      }
    );
    const data = await response.json();

    setRestaurantOrdersList(data);
  };
  const onChangeHandler = (event) => {
    setOrderFilter(event.target.value);
  };

  const onClickHandler = (Id, customerFlag) => {
    if (customerFlag) {
      setCustomerDetailsModalShow(true);
      getCustomerDetails(Id);
    } else {
      setDetailsModalShow(true);
      getOrderDetails(Id);
    }
  };

  const updateDeliveryStatus = async (orderId) => {
    let updatedOrderStatusList = orderStatus.filter(
      (order) => order.orderId === orderId
    );
    let updatedOrderStatus = updatedOrderStatusList?.[0]?.orderStatus;

    if (updatedOrderStatus) {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/updateOrderStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: orderId,
            orderStatus: updatedOrderStatus,
          }),
        }
      );

      const data = await response.json();

      setRestaurantOrdersList((prevState) => {
        return prevState.map((prevOrder) => {
          return prevOrder.orderId === data.orderId ? { ...data } : prevOrder;
        });
      });
      setOrderStatus([]);
      alert("Order status updated succesfully");
    } else {
      alert("Please Select Delivery Status to Update");
    }
  };

  const getOrderDetails = async (orderId) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/showRestaurantOrderDetails`,
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
    setOrderDetails(data);
  };

  const getCustomerDetails = async (customerId) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/showCustomerProfile`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: customerId,
        }),
      }
    );
    const data = await response.json();
    setCustomerDetails(data);
  };

  const formatTextForOrders = (date, quantity, price, deliveryAddress) => {
    let parseDate = new Date(date);
    return parseDate ? (
      <div>
        <p>{`${quantity} items for $${price} on ${parseDate.toLocaleString(
          "en-US",
          { timeZone: "PST" }
        )}`}</p>
        <p>{`Delivery Address : ${deliveryAddress}`}</p>
      </div>
    ) : (
      <div>
        <p>{`${quantity} items for $${price}`}</p>
        <p>{`Delivery Address : ${deliveryAddress}`}</p>
      </div>
    );
  };

  const displayOrders = () => {
    return restaurantOrdersList?.length > 0 ? (
      restaurantOrdersList.map((order, index) => {
        return (
          <Row>
            {" "}
            <ListGroup.Item>
              <Row>
                <Col>
                  <h4>{order.orderStatus}</h4>
                </Col>
                <Col>
                  <Button
                    variant="success"
                    onClick={() => updateDeliveryStatus(order.orderId)}
                  >
                    Update Delivery status
                  </Button>
                  <Form.Control
                    name="deliveryStatusSelected"
                    placeholder="Order Status"
                    as="select"
                    onChange={(event) =>
                      onOrderStatusChangeHandler(event, order.orderId)
                    }
                  >
                    {checkDeliveryStatusOptions(order.deliveryType)}
                  </Form.Control>
                </Col>
              </Row>
              <Col>
                {formatTextForOrders(
                  order.dateOrdered,
                  order.totalQuantity,
                  order.totalPrice,
                  order.deliveryAddress
                )}
              </Col>
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(order.orderId, false)}
                >
                  View Order Details
                </Button>
              </Col>
              <ReceiptModal
                receiptModalShow={detailsModalShow}
                onHide={() => setDetailsModalShow(false)}
                receiptDetails={orderDetails}
                header={"Details"}
              />
              <Col>
                {" "}
                <Button
                  variant="light"
                  onClick={() => onClickHandler(order.customerId, true)}
                >
                  View Customer Details
                </Button>
              </Col>
              <CustomerModal
                customerDetailsModalShow={customerDetailsModalShow}
                onHide={() => setCustomerDetailsModalShow(false)}
                customerDetails={customerDetails}
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

  useEffect(() => {
    getRestaurantOrders();
  }, [orderFilter]);

  return (
    <Container fluid className="mt-5">
      <Row>
        <Col>Orders</Col>
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

export default RestaurantOrders;
