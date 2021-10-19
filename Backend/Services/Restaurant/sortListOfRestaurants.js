const sortListOfRestaurants = (result, customerLocation) => {
  let customerLocationRestaurants = result.filter((restaurant) => {
    if (restaurant.City.trim() === customerLocation) return restaurant;
  });

  let orderOfRestaurants = [...customerLocationRestaurants];

  let differentLocationRestaurants = result.filter(
    (restaurant) => restaurant.City.trim() !== customerLocation
  );

  orderOfRestaurants = [...orderOfRestaurants, ...differentLocationRestaurants];

  return orderOfRestaurants;
};

module.exports = sortListOfRestaurants;
