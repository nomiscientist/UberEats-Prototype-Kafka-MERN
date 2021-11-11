const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");

const handle_request = async (list, callback) => {
  let listOfTypeahead = [];

  let flag;

  if (list.deliveryType === "delivery") {
    flag = "deliveryFlag";
  } else {
    flag = "pickupFlag";
  }

  const inputValue = list.input;

  try {
    const restaurantDetail1 = await RestaurantDetails.find({
      [flag]: "Yes",
      city: { $regex: new RegExp(inputValue, "i") },
    }).exec();

    if (restaurantDetail1) {
      let tempObject = {};

      restaurantDetail1.forEach((v) => {
        tempObject[v.city]
          ? tempObject[v.city].push(v._id)
          : (tempObject[v.city] = [v._id]);
      });

      Object.keys(tempObject).forEach((keyValue) => {
        listOfTypeahead.push({
          name: keyValue,
          id: tempObject[keyValue],
          isRestaurant: false,
        });
      });
    }

    const restaurantDetail = await RestaurantDetails.find({
      $flag: "Yes",
      restaurantName: { $regex: new RegExp(inputValue, "i") },
    }).exec();

    if (restaurantDetail) {
      restaurantDetail.forEach((v) => {
        listOfTypeahead.push({
          name: v.restaurantName,
          id: [v._id],
          isRestaurant: true,
        });
      });
    }

    const restaurantDish = await RestaurantDishes.aggregate([
      {
        $match: { dishName: { $regex: new RegExp(inputValue, "i") } },
      },
    ]).exec();

    if (restaurantDish) {
      let tempObject = {};

      restaurantDish.forEach((v) => {
        tempObject[v.dishName]
          ? tempObject[v.dishName].push(v._id)
          : (tempObject[v.dishName] = [v._id]);
      });

      Object.keys(tempObject).forEach((keyValue) => {
        listOfTypeahead.push({
          name: keyValue,
          id: tempObject[keyValue],
          isRestaurant: false,
        });
      });
    }

    callback(null, listOfTypeahead);
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
