import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import AddDishModal from "./addDishModal.js";
import EditDishModal from "./editDishModal.js";
import OrderModal from "../customer/orderModal.js";
import * as IoIcons from "react-icons/io";
import Holder from "../images/holder.png";
import RestaurantEditDetails from "./restaurantEditDetails.js";
import { BsPencilSquare } from "react-icons/bs";
import { getSessionCookie } from "../common/session";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import { useLocation } from "react-router-dom";
import { IoLocation } from "react-icons/io5";

const RestaurantDetails = (props) => {
  let imageUrl = Holder;

  const [modalShow, setModalShow] = useState(false);
  const [restaurantModalShow, setRestaurantModalShow] = useState(false);
  const [profilePicture, setProfilePicture] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [renderedList, setRenderedList] = useState([]);

  const session = getSessionCookie();

  let restaurantId;

  if (session.restaurantFlag) {
    restaurantId = session.primaryID;
  } else {
    restaurantId = window.sessionStorage.getItem("restaurantId");
  }

  if (profilePicture.imagePreview) {
    imageUrl = profilePicture.imagePreview;
  }

  const getRestaurantProfileInfo = async () => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/restaurantDetailsInfo?restaurantId=${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json, charset= UTF-8",
          Accept: "application/json, text/html, image/png",
        },
      }
    );

    const data = await response.json();

    setRestaurantDetails((prevState) => {
      return {
        ...prevState,
        restaurantId: data.restaurantId,
        restaurantName: data.restaurantName,
        address: data.address,
        about: data.about,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
        emailId: data.emailId,
        contactNumber: data.contactNumber,
        openTime: data.openTime,
        closeTime: data.closeTime,
        deliveryFlag: data.deliveryFlag,
        pickupFlag: data.pickupFlag,
      };
    });

    if (data.image) {
      setProfilePicture((prevState) => {
        return {
          ...prevState,
          imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + data.image,
        };
      });
    }
  };

  const getDishesHandler = async (event) => {
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/foodItemsDisplay?restaurantId=${restaurantId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json, charset= UTF-8",
          Accept: "application/json, text/html, image/png",
        },
      }
    );

    const data = await response.json();

    setRenderedList(
      data.map((dataRow) => {
        return {
          ...dataRow,
          imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + dataRow.image,
          show: false,
        };
      })
    );
  };

  const showEditHandler = (key, showFlag) => {
    setRenderedList((prevState) => {
      const newarry = [...prevState];
      newarry[key].show = showFlag;
      return newarry;
    });

    if (session.restaurantFlag) {
      if (!showFlag) {
        getDishesHandler();
      }
    }
  };

  const renderModal = (key, item) => {
    if (session.restaurantFlag) {
      return (
        <EditDishModal
          onHide={() => showEditHandler(key, false)}
          keyValue={key}
          dishItem={item}
          setRenderedList={setRenderedList}
        />
      );
    } else {
      return (
        <OrderModal
          onHide={() => showEditHandler(key, false)}
          keyValue={key}
          dishItem={item}
          customerId={session.primaryID}
        />
      );
    }
  };

  const displayList = () => {
    return (
      <Row>
        {renderedList.map((item, key) => {
          return (
            <Col xs={12} md={3} className="my-2">
              <Button
                variant="light"
                onClick={() => showEditHandler(key, true)}
              >
                <Card>
                  <Card.Img variant="top" src={item.imagePreview} />
                  <Card.Header>{item.dishName}</Card.Header>

                  <font size="1">
                    <Card.Text>{item.description}</Card.Text>
                  </font>
                  <font size="2">
                    <Card.Text></Card.Text>
                    <Card.Text>
                      ${item.price} • {item.dishType} • {item.dishCategory}
                    </Card.Text>
                  </font>
                </Card>
              </Button>
              {renderModal(key, item)}
            </Col>
          );
        })}
      </Row>
    );
  };

  useEffect(() => {
    getDishesHandler();
  }, []);

  useEffect(() => {
    getRestaurantProfileInfo();
  }, []);

  const showEditbutton = () => {
    if (session.restaurantFlag)
      return (
        <>
          Edit
          <BsPencilSquare
            onClick={() => setRestaurantModalShow(true)}
            variant="dark"
          />
        </>
      );
  };
  const addDishButton = () => {
    if (session.restaurantFlag)
      return (
        <>
          <Button size="sm" variant="dark" onClick={() => setModalShow(true)}>
            Add Dishes
          </Button>
          <AddDishModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            getDishesHandler={getDishesHandler}
          />
        </>
      );
  };

  return (
    <Container fluid>
      <Form>
        <Row>
          <Card>
            <Card.Img variant="top" src={imageUrl} height="300px" />

            <Card.Body style={{ color: "grey" }}>
              <Card.Text style={{ textAlign: "left" }}>
                <h1
                  style={
                    ({ fontFamily: "Garamond" },
                    { fontSize: 45 },
                    { margin: "0" })
                  }
                >
                  {restaurantDetails.restaurantName}
                </h1>
                <p>{restaurantDetails.about}</p>
                <font size="2">
                  <p style={{ margin: "0" }}>
                    <IoLocation />
                    {" " + restaurantDetails.address}, {restaurantDetails.city},{" "}
                    {restaurantDetails.zipCode}, {restaurantDetails.state}
                  </p>
                </font>
                <font size="2">
                  <p style={{ margin: "0" }}>
                    <IoIcons.IoMdMail />
                    {" " + restaurantDetails.emailId + " "}{" "}
                    <FaIcons.FaPhoneAlt />
                    {" " + restaurantDetails.contactNumber}
                  </p>
                  <p style={{ margin: "0" }}>
                    Open Time : {restaurantDetails.openTime} • Close Time :{" "}
                    {restaurantDetails.closeTime}
                  </p>
                  <p style={{ margin: "0" }}>
                    Delivery Available : {restaurantDetails.deliveryFlag} •
                    Pickup Available : {restaurantDetails.pickupFlag}
                  </p>
                </font>
                <Col>{showEditbutton()}</Col>
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Row>
                <Col md={10} style={{ color: "grey" }}>
                  <h4 style={{ textAlign: "left" }}>Restaurant Menu</h4>
                </Col>
                <Col>
                  <RestaurantEditDetails
                    show={restaurantModalShow}
                    getRestaurantProfileInfo={getRestaurantProfileInfo}
                    onHide={() => setRestaurantModalShow(false)}
                    restaurantDetails={restaurantDetails}
                    setRestaurantDetails={setRestaurantDetails}
                    profilePicture={profilePicture}
                    setProfilePicture={setProfilePicture}
                  />

                  {addDishButton()}
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Row>
      </Form>

      {displayList()}
    </Container>
  );
};

export default RestaurantDetails;
