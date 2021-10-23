const sortListOfRestaurants = require("./sortListOfRestaurants");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const getListOfRestaurants = async (req, res) => {
  // console.log("=====================");

  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: req.body.customerId,
    }).exec();

    let customerLocation = customerDetail?.city;
    let resultFavRest = customerDetail.favoriteRestaurant;
    console.log("resultFavRest", resultFavRest);

    let restaurantDetail = [];

    if (req.body.filter.length === 0 && req.body.typeaheadValue.length === 0) {
      if (req.body.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
        }).exec();
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
        }).exec();
      }
      console.log("1st wala", restaurantDetail);
    } //end of 1st case
    else if (
      req.body.filter.length > 0 &&
      req.body.typeaheadValue.length === 0
    ) {
      const restaurantDish = await RestaurantDishes.find({
        dishType: { $in: req.body.filter },
      }).exec();

      console.log("restaurantDish", restaurantDish);
      let restaurantIdList = [];

      restaurantDish.forEach((v) => {
        restaurantIdList.push({
          restaurantId: v.restaurantId,
        });
      });

      console.log("restaurantIdList", restaurantIdList);

      if (restaurantIdList.length > 0) {
        if (req.body.deliveryType === "pickup") {
          restaurantDetail = await RestaurantDetails.find({
            pickupFlag: "Yes",
            restaurantId: { $in: restaurantIdList },
          }).exec();
        } else {
          restaurantDetail = await RestaurantDetails.find({
            deliveryFlag: "Yes",
            restaurantId: { $in: restaurantIdList },
          }).exec();
        }
      }
      console.log("2nd wala", restaurantDetail);
    } //end of 2nd case
    else if (req.body.filter.length > 0 && req.body.typeaheadValue.length > 0) {
      const restaurantDish = await RestaurantDishes.find({
        dishType: { $in: req.body.filter },
        restaurantId: { $in: req.body.typeaheadValue },
      }).exec();

      let restaurantIdList = [];

      restaurantDish.forEach((v) => {
        restaurantIdList.push({
          restaurantId: v.restaurantId,
        });
      });

      if (req.body.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
          restaurantId: { $in: restaurantIdList },
        }).exec();
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
          restaurantId: { $in: restaurantIdList },
        }).exec();
      }

      // console.log("3rd wala", restaurantDetail);
    } else if (
      req.body.filter.length === 0 &&
      req.body.typeaheadValue.length > 0
    ) {
      if (req.body.deliveryType === "pickup") {
        restaurantDetail = await RestaurantDetails.find({
          pickupFlag: "Yes",
          restaurantId: { $in: req.body.typeaheadValue },
        }).exec();
      } else {
        restaurantDetail = await RestaurantDetails.find({
          deliveryFlag: "Yes",
          restaurantId: { $in: req.body.typeaheadValue },
        }).exec();
      }

      //console.log("4th wala", restaurantDetail);
    }
    //end of 4th case

    let orderOfRestaurants;

    if (restaurantDetail) {
      // if (resultFavRest) {
      console.log("final h kya", restaurantDetail);

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
      console.log("newList", newList);

      orderOfRestaurants = sortListOfRestaurants(newList, customerLocation);
      // } else {
      //   orderOfRestaurants = sortListOfRestaurants(
      //     restaurantDetail,
      //     customerLocation
      //   );
      // }

      console.log("orderOfRestaurants", orderOfRestaurants);
      res.send(orderOfRestaurants);
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};
module.exports = getListOfRestaurants;
