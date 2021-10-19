import RestaurantSearch from "../customer/restaurantSearch";
import RestaurantDetails from "../restaurant/restaurantDetails";
import ProfileInfo from "../customer/profileInfo";
import Orders from "../customer/orders";
import Favorites from "../customer/favorites";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { useContext } from "react";
import Checkout from "../customer/checkout";
import { SessionContext, getSessionCookie } from "./session";
import MainHeader from "./mainHeader";

const ProtectedRouter = ({ history }) => {
  // const session = useContext(SessionContext);
  const session = getSessionCookie();
  console.log("Session Cookie Value", session);
  if (session.primaryID === undefined) {
    console.log("I am in protected Router");
    history.push("/");
    return <div></div>;
  } else {
    return (
      <>
        <Route
          path="/restaurantDetails"
          render={() => <MainHeader tab={"restaurantDetails"} />}
        />
        <Route
          path="/restaurantSearch"
          render={() => <MainHeader tab={"restaurantSearch"} />}
        />
        <Route
          path="/favorites"
          render={() => <MainHeader tab={"favorites"} />}
        />
        <Route
          path="/profileInfo"
          render={() => <MainHeader tab={"profile"} />}
        />
        <Route path="/orders" render={() => <MainHeader tab={"orders"} />} />
        <Route
          path="/restaurantOrders"
          render={() => <MainHeader tab={"restaurantOrders"} />}
        />
        <Route
          path="/checkout"
          render={() => <MainHeader tab={"checkout"} />}
        />
      </>
    );
  }
};

export default ProtectedRouter;
