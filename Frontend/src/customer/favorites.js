import {Container } from "react-bootstrap";
import React, {useEffect } from "react";
import RestaurantList from "../customer/restaurantList.js";
import { NODE_HOST, NODE_PORT } from "../common/envConfig";
import {getFavoriteRestaurants} from "./favoritesRequests";

const Favorites = (props) => {

  const populateFavoriteRestaurants = async () => {

    const favoritesData =  await getFavoriteRestaurants ();
      props.setRestaurantList(
        favoritesData.map((d) => {
          return {
            ...d,
            isLiked: true,
            imagePreview:
              `http://${NODE_HOST}:${NODE_PORT}/` + d.ProfilePicture,
          };
        })
      );
  
  };

  useEffect(() => {
    populateFavoriteRestaurants();
  }, []);

  return (
    <Container>
      <h1>Favorite Restaurants</h1>
      <RestaurantList
        restaurantList={props.restaurantList}
        getFavoriteRestaurants={getFavoriteRestaurants}
      />
    </Container>
  );
};

export default Favorites;
