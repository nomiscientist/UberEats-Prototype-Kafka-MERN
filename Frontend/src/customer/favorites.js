import { Container } from "react-bootstrap";
import React, { useEffect } from "react";
import RestaurantList from "../customer/restaurantList.js";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import { getFavoriteRestaurants } from "./favoritesRequests";
import { useDispatch } from "react-redux";
import { reduxConstants } from "../constants/reduxConstants.js";

const Favorites = (props) => {
  const dispatch = useDispatch();

  const populateFavoriteRestaurants = async () => {
    const favoritesData = await getFavoriteRestaurants();

    let restList = favoritesData.map((d) => {
      return {
        ...d,
        isLiked: true,
        imagePreview: `http://${NODE_HOST}:${NODE_PORT}/` + d.image,
      };
    });
    console.log("restList", restList);
    dispatch({ type: reduxConstants.RESTAURANT_LIST, restList });
  };

  useEffect(() => {
    populateFavoriteRestaurants();
  }, []);

  return (
    <Container>
      <h1>Favorite Restaurants</h1>
      <RestaurantList
        // restaurantList={restaurantList}
        getFavoriteRestaurants={getFavoriteRestaurants}
      />
    </Container>
  );
};

export default Favorites;
