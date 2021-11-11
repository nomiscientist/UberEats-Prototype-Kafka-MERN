const sortListOfRestaurants = require("./sortListOfRestaurants");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (listDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: listDetails.customerId,
    }).exec();

    let customerLocation = customerDetail?.city;
    let resultFavRest = customerDetail.favoriteRestaurant;

    let restaurantDetail = [];

    if (
      listDetails.filter.length === 0 &&
      listDetails.typeaheadValue.length === 0
    ) {
      if (listDetails.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
        }).exec();
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
        }).exec();
      }
    } //end of 1st case
    else if (
      listDetails.filter.length > 0 &&
      listDetails.typeaheadValue.length === 0
    ) {
      const restaurantDish = await RestaurantDishes.find({
        dishType: { $in: listDetails.filter },
      }).exec();

      let restaurantIdList = [];

      restaurantDish.forEach((v) => {
        restaurantIdList.push(v.restaurantId);
      });

      if (restaurantIdList.length > 0) {
        if (listDetails.deliveryType === "pickup") {
          restaurantDetail = await RestaurantDetails.find({
            pickupFlag: "Yes",
            _id: { $in: restaurantIdList },
          }).exec();
        } else {
          restaurantDetail = await RestaurantDetails.find({
            deliveryFlag: "Yes",
            _id: { $in: restaurantIdList },
          }).exec();
        }
      }
    } //end of 2nd case
    else if (
      listDetails.filter.length > 0 &&
      listDetails.typeaheadValue.length > 0
    ) {
      const restaurantDish = await RestaurantDishes.find({
        dishType: { $in: listDetails.filter },
        restaurantId: { $in: listDetails.typeaheadValue },
      }).exec();

      let restaurantIdList = [];

      restaurantDish.forEach((v) => {
        restaurantIdList.push({
          restaurantId: v.restaurantId,
        });
      });

      if (listDetails.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
          _id: { $in: restaurantIdList },
        }).exec();
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
          _id: { $in: restaurantIdList },
        }).exec();
      }
    } else if (
      listDetails.filter.length === 0 &&
      listDetails.typeaheadValue.length > 0
    ) {
      let restaurantIdList = [];

      console.log("listDetails.typeaheadValue ", listDetails.typeaheadValue);
      if (listDetails.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
        }).exec();

        restaurantDetail.forEach((v) => {
          restaurantIdList.push(v._id);
        });
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
          // restaurantId: { $in: listDetails.typeaheadValue },
        }).exec();

        restaurantDetail.forEach((v) => {
          restaurantIdList.push(v._id);
        });
      }
    }
    //end of 4th case

    let orderOfRestaurants;

    if (restaurantDetail) {
      // if (resultFavRest) {

      let newList = restaurantDetail.map((restaurant) => {
        let isLiked = false;
        if (resultFavRest.includes(restaurant._id)) {
          isLiked = true;
        }
        return {
          ...restaurant._doc,
          isLiked: isLiked,
        };
      });

      orderOfRestaurants = sortListOfRestaurants(newList, customerLocation);

      console.log("orderOfRestaurants", orderOfRestaurants);
      callback(null, orderOfRestaurants);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
