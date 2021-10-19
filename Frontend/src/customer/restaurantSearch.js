import "../styling/customer/restaurantSearch.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import RestaurantList from "./restaurantList.js";
import React, { useEffect } from "react";
import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import ImageDisplay from "../images/restSearchpage.jpeg";
import ImageDisplay1 from "../images/restSearchpage2.jpeg";
import Image from "react-bootstrap/Image";

const RestaurantSearch = (props) => {
  const session = getSessionCookie();

  const onFilterCheckHandler = (event) => {
    props.setFoodFilter((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.checked,
      };
    });
  };

  const fetchFilteredRestaurants = React.useCallback(async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getListOfRestaurants`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filter: Object.keys(props.foodFilter).filter(
              (keyValue) => props.foodFilter[keyValue]
            ),
            typeaheadValue: props.typeaheadValue[0].id
              ? props.typeaheadValue[0].id
              : [],
            customerId: session.primaryID,
            deliveryType: props.deliveryType,
          }),
        }
      );

      let data = await response.json();

      props.setRestaurantList(
        data.map((d) => {
          return {
            ...d,
            imagePreview:
              `http://${NODE_HOST}:${NODE_PORT}/` + d.ProfilePicture,
          };
        })
      );
    } catch (error) {
      console.log(error);
    }
  }, [
    props.foodFilter,
    props.typeaheadValue,
    props.deliveryType,
    session.primaryID,
  ]);

  useEffect(() => {
    fetchFilteredRestaurants();
  }, [fetchFilteredRestaurants]); //TO DO: ADD a react use callback here

  return (
    <>
      <Container fluid className="mt-5">
        <Row>
          <Col xs={12} md={6}>
            <Image
              src={ImageDisplay}
              height="60%"
              width="75%"
              style={{ marginLeft: "0" }}
            />
          </Col>
          <Col xs={12} md={6}>
            <Image
              src={ImageDisplay1}
              height="60%"
              width="75%"
              style={{ marginLeft: "0" }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <Row>
              <Col>
                <h4
                  style={{
                    textAlign: "left",
                  }}
                >
                  Filters
                </h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5
                  style={{
                    textAlign: "left",
                  }}
                >
                  Dietary
                </h5>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Check
                    name="Vegan"
                    type="checkbox"
                    label={<h6>Vegan</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="Vegetarian"
                    label={<h6>Vegetarian</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                {" "}
                <Form.Group className="mb-3">
                  <Form.Check
                    name="Non-Vegetarian"
                    type="checkbox"
                    label={<h6>Non-Vegetarian</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Check
                    name="Halal"
                    type="checkbox"
                    label={<h6>Halal</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group className="mb-3">
                  <Form.Check
                    name="Gluten-Free"
                    type="checkbox"
                    label={<h6>Gluten-free</h6>}
                    onChange={onFilterCheckHandler}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={10}>
            <RestaurantList
              restaurantList={props.restaurantList}
              fetchFilteredRestaurants={fetchFilteredRestaurants}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RestaurantSearch;
