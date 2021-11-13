import "../styling/customer/restaurantSearch.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import RestaurantList from "./restaurantList.js";
import React, { useEffect } from "react";
import { getSessionCookie } from "../common/session";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import ImageDisplay from "../images/restSearchpage.jpeg";
import ImageDisplay1 from "../images/restSearchpage2.jpeg";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants.js";

const RestaurantSearch = (props) => {
  const session = getSessionCookie();
  const dispatch = useDispatch();
  const foodFilter = useSelector((state) => state.mainHeader.foodFilter);
  const typeaheadSelected = useSelector(
    (state) => state.mainHeader.typeaheadSelected
  );

  const onFilterCheckHandler = (event) => {
    // props.setFoodFilter((prevState) => {
    //   return {
    //     ...prevState,
    //     [event.target.name]: event.target.checked,
    //   };
    // });
    let foodFil = { [event.target.name]: event.target.checked };

    dispatch({ type: reduxConstants.FOOD_FILTER, foodFil });
  };

  const fetchFilteredRestaurants = React.useCallback(async () => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getListOfRestaurants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: session.token,
          },
          body: JSON.stringify({
            filter: Object.keys(foodFilter).filter(
              (keyValue) => foodFilter[keyValue]
            ),
            typeaheadValue: typeaheadSelected[0].id
              ? typeaheadSelected[0].id
              : [],
            customerId: session.primaryID,
            deliveryType: props.deliveryType,
          }),
        }
      );

      let data = await response.json();

      let restList = data.map((d) => {
        return {
          ...d,
          imagePreview: d.image,
          // imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + d.image,
        };
      });

      dispatch({ type: reduxConstants.RESTAURANT_LIST, restList });

      // props.setRestaurantList(
      //   data.map((d) => {
      //     return {
      //       ...d,
      //       imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + d.image,
      //     };
      //   })
      // );
    } catch (error) {
      console.log(error);
    }
  }, [foodFilter, typeaheadSelected, props.deliveryType, session.primaryID]);

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
              // restaurantList={restaurantList}
              fetchFilteredRestaurants={fetchFilteredRestaurants}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RestaurantSearch;
