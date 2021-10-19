import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import Image from "react-bootstrap/Image";
import * as Icon from "react-bootstrap-icons";
import CustomerNavbar from "../customer/customerNavbar.js";
import RestaurantNavbar from "../restaurant/restaurantNavbar.js";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import { Link } from "react-router-dom";
import useCartCheckoutModal from "./useCartCheckoutModal";
import RestaurantSearch from "../customer/restaurantSearch";
import RestaurantDetails from "../restaurant/restaurantDetails";
import { useHistory } from "react-router-dom";
import Favorites from "../customer/favorites.js";
import Checkout from "../customer/checkout.js";
import ProfileInfo from "../customer/profileInfo.js";
import Orders from "../customer/orders.js";
import { getSessionCookie } from "../common/session";
import RestaurantOrders from "../restaurant/restaurantOrders";
import { useDispatch, useSelector } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants.js";
import UberEatsIcon from "../images/UberEatsIcon.png";

const MainHeader = (props) => {
  let showTabs = props.tab;
  const [modalShow, setModalShow] = useState(false);
  const [typeaheadOutput, setTypeaheadOutput] = useState([]);
  const [valueSelected, setValueSelected] = useState([{}]);
  const [foodFilter, setFoodFilter] = useState({});
  const [restaurantList, setRestaurantList] = useState([]);
  const [customerLocation, setCustomerLocation] = useState("");
  const dispatch = useDispatch();
  const deliveryType = useSelector((state) => state.order.deliveryType);
  // Used custom hook
  const onHide = () => setModalShow(false);
  const { cartModal, getCartDetails, cartDetails } = useCartCheckoutModal(
    modalShow,
    onHide
  );

  const history = useHistory();

  const session = getSessionCookie();

  useEffect(() => {
    getCustomerLocation();
  }, []);

  const inputChangeHandler = (input, event) => {
    event.preventDefault();

    optionDislayHandler(input);
  };

  const getCustomerLocation = async () => {
    if (!session.restaurantFlag) {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getCustomerLocation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId: session.primaryID,
          }),
        }
      );

      const data = await response.json();
      setCustomerLocation(data.city);
    }
  };

  const onChangeHandler = (selected) => {
    setValueSelected(selected);
    if (selected[0]?.isRestaurant) {
      window.sessionStorage.setItem("restaurantId", selected[0].id);
      history.push("/restaurantDetails");
    } else {
      if (!showTabs) history.push("/restaurantSearch");
    }
  };

  const deliveryTypeChangeHandler = (event) => {
    if (cartDetails && cartDetails.length > 0) {
      alert(
        " This option cannot be changed as there is an existing order in your cart"
      );
    } else {
      let value = event.currentTarget.value;
      dispatch({ type: reduxConstants.ORDER_DELIVERY_TYPE, value });
    }
  };

  const optionDislayHandler = async (typeaheadInput) => {
    try {
      const response = await fetch(
        `http://${NODE_HOST}:${NODE_PORT}/getTypeaheadList`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            input: typeaheadInput,
            deliveryType: deliveryType,
          }),
        }
      );

      let data = await response.json();

      setTypeaheadOutput(() => {
        return data;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const renderPages = (tab) => {
    if (tab === "restaurantDetails") return <RestaurantDetails />;
    else if (tab === "restaurantSearch")
      return (
        <RestaurantSearch
          foodFilter={foodFilter}
          setFoodFilter={setFoodFilter}
          restaurantList={restaurantList}
          setRestaurantList={setRestaurantList}
          typeaheadValue={valueSelected}
          deliveryType={deliveryType}
        />
      );
    else if (tab === "favorites")
      return (
        <Favorites
          restaurantList={restaurantList}
          setRestaurantList={setRestaurantList}
        />
      );
    else if (tab === "checkout") return <Checkout />;
    else if (tab === "profile") return <ProfileInfo />;
    else if (tab === "orders") return <Orders />;
    else if (tab === "restaurantOrders") return <RestaurantOrders />;
  };

  return (
    <>
      <Container fluid className="my-3">
        <Row>
          <Col xs={3} md={1}>
            {session.restaurantFlag ? <RestaurantNavbar /> : <CustomerNavbar />}
          </Col>
          <Col className="mt-3" xs={4} md={2}>
            {session.restaurantFlag ? (
              <Link to="/restaurantDetails">
                <Image src={UberEatsIcon} width="175px" />
              </Link>
            ) : (
              <Link to="/restaurantSearch">
                <Image src={UberEatsIcon} width="175px" />
              </Link>
            )}
          </Col>
          {session.restaurantFlag ? (
            <Col />
          ) : (
            <>
              <Col className="mt-3" xs={4} md={2}>
                <ButtonGroup className="mb-2">
                  <ToggleButton
                    key={1}
                    id={1}
                    type="radio"
                    variant="outline-dark"
                    name="radio"
                    value="delivery"
                    checked={deliveryType === "delivery"}
                    onChange={deliveryTypeChangeHandler}
                  >
                    <font size="2"> Delivery</font>
                  </ToggleButton>
                  <ToggleButton
                    key={2}
                    id={2}
                    type="radio"
                    variant="outline-dark"
                    name="radio"
                    value="pickup"
                    checked={deliveryType === "pickup"}
                    onChange={deliveryTypeChangeHandler}
                  >
                    <font size="2"> Pickup</font>
                  </ToggleButton>
                </ButtonGroup>
              </Col>
              {customerLocation === "" ? (
                <Col />
              ) : (
                <Col className="mt-3" xs={4} md={2}>
                  <Button variant="outline-dark">
                    <Icon.GeoAltFill />{" "}
                    <font size="2"> {customerLocation}</font>
                  </Button>
                </Col>
              )}
              <Col className="mt-3" xs={12} md={3}>
                <Typeahead
                  id="id123"
                  labelKey={(option) => `${option.name}`}
                  maxResults={10}
                  paginate={false}
                  placeholder="What are you craving for?"
                  onChange={onChangeHandler}
                  onInputChange={inputChangeHandler}
                  options={typeaheadOutput}
                  selected={valueSelected.name}
                />
              </Col>
              <Col className="mt-3" xs={4} md={2}>
                <Button
                  variant="dark"
                  onClick={() => {
                    getCartDetails();
                    setModalShow(true);
                  }}
                >
                  <Icon.CartPlus />
                  <font size="2"> Cart</font>
                </Button>

                {cartModal()}
              </Col>
            </>
          )}
        </Row>
      </Container>
      {renderPages(showTabs)}
    </>
  );
};

export default MainHeader;
