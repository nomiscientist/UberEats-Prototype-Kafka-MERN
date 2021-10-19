import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { SessionContext, getSessionCookie } from "./session";
import RestaurantSignUp from "../restaurant/restaurantsignUp";
import RestaurantLogin from "../restaurant/restaurantLogin";
import CustomerLogin from "../customer/customerLogin";

import CustomerSignUp from "../customer/customerSignUp";
import HomePage from "./homePage";
import ProtectedRouter from "./protectedRouter";

const Routes = () => {
  const history = useHistory();
  // const session = getSessionCookie();

  return (
    // <SessionContext.Provider value={session}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/restaurantLogin" component={RestaurantLogin} />
        <Route path="/restaurantSignUp" component={RestaurantSignUp} />
        <Route path="/customerLogin" component={CustomerLogin} />
        <Route path="/customerSignUp" component={CustomerSignUp} />
        <Route path="*" component={ProtectedRouter} />
      </Switch>
    </Router>
    // </SessionContext.Provider>
  );
};

export default Routes;
