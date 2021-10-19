import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col, Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";

const OrderModal = (props) => {
  const [cartDetail, setCartDetail] = useState({});
  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [quanity, setQuantity] = useState(0);
  const [cartRestaurantDetails, setCartRestaurantDetails] = useState([]);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  const session = getSessionCookie();

  const customerDeliveryType = useSelector((state) => state.order.deliveryType);
  let modalHide = props.onHide;

  let quantityList = Array.from(Array(100).keys());

  const showOptions = () => {
    let options = quantityList.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
    return options;
  };

  const onChangeHandler = (event) => {
    event.preventDefault();

    setCartDetail((prevState) => {
      return {
        ...prevState,
        foodId: props.dishItem.foodId,
        customerId: props.customerId,
        restaurantId: props.dishItem.restaurantId,
        foodName: props.dishItem.dishName,
        quantity: event.target.value,
        dishPrice: props.dishItem.price,
        restaurantName: props.dishItem.restaurantName,
      };
    });

    setQuantity(event.target.value);
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
      if (data.length > 0) {
        setCartRestaurantDetails([
          data[0].RestaurantID,
          data[0].RestaurantName,
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartDetails();
  }, [props.dishItem.show]);

  const viewImageHandler = () => {
    if (props.dishItem.image) {
      return (
        <Form.Control
          name="imagePreview"
          type="image"
          src={props.dishItem.imagePreview}
        />
      );
    }
  };

  const newOrderClickHandler = () => {
    submitNewOrder();
  };

  const submitNewOrder = async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/createNewOrder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...cartDetail,
            deliveryType: customerDeliveryType,
          }),
        }
      );

      const data = await response.json();
      setCartDetail((prevState) => {
        return {
          ...prevState,
          orderId: data.orderId,
        };
      });
      setShowNewOrderModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const displayNewOrderModal = () => {
    return (
      <Modal
        show={showNewOrderModal}
        onHide={() => setShowNewOrderModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        size="sm"
      >
        <Modal.Header closeButton>
          <h4>Create new order ?</h4>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <font size="3">
            Your order contains items from Restaurant {cartRestaurantDetails[1]}
            . Create a new order to add items from Restaurant{" "}
            {cartDetail.restaurantName}
          </font>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={newOrderClickHandler} variant="dark">
            New Order
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      cartRestaurantDetails.length === 0 ||
      (cartDetail && cartDetail.restaurantId === cartRestaurantDetails[0])
    ) {
      try {
        const response = await fetch(
          `http://${NODE_HOST}:${NODE_PORT}/addOrdertoCart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...cartDetail,
              deliveryType: customerDeliveryType,
            }),
          }
        );
        const data = await response.json();

        setCartDetail((prevState) => {
          return {
            ...prevState,
            orderId: data.orderId,
          };
        });
      } catch (error) {
        console.log(error);
      }
    } else if (
      cartDetail &&
      cartDetail.restaurantId !== cartRestaurantDetails[0]
    ) {
      setShowNewOrderModal(true);
    }
    props.onHide();
  };

  const buttonDisplay = () => {
    if (quanity == 0) {
      setbuttonDisabled(true);
    } else setbuttonDisabled(false);
  };

  useEffect(() => {
    buttonDisplay();
  }, [quanity]);

  return (
    <>
      <Modal
        show={props.dishItem.show}
        onHide={modalHide}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Header closeButton>
          <font size="6">{props.dishItem.dishName}</font>
        </Modal.Header>

        <Modal.Body className="show-grid">
          <Container>
            <Row>{viewImageHandler()}</Row>
          </Container>
          <font size="2">
            <Row className="mb-3">{props.dishItem.description}</Row>
          </font>

          <Row className="mb-3">Price : ${props.dishItem.price}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group required as={Col}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    name="quantity"
                    as="select"
                    // defaultValue={0}
                    htmlSize={1}
                    size="sm"
                    custom
                    type="number"
                    onChange={onChangeHandler}
                  >
                    {showOptions()}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Button type="submit" variant="dark" disabled={buttonDisabled}>
                  Add to Order
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Footer>
      </Modal>
      {displayNewOrderModal()}
    </>
  );
};

export default OrderModal;
