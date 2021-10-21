const sortListOfRestaurants = (result, customerLocation) => {
  let customerLocationRestaurants = result.filter((restaurant) => {
    if (restaurant.city === customerLocation) return restaurant;
  });

  let orderOfRestaurants = [...customerLocationRestaurants];

  let differentLocationRestaurants = result.filter(
    (restaurant) => restaurant.city !== customerLocation
  );

  orderOfRestaurants = [...orderOfRestaurants, ...differentLocationRestaurants];

  return orderOfRestaurants;
};

module.exports = sortListOfRestaurants;
