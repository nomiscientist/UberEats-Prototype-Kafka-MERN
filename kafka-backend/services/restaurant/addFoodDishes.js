const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const RestaurantDishesModel = require("../../Models/RestaurantDishesModel");

const multer = require("multer");

const handle_request = async (foodDetails, callback) => {
  const RestaurantDish = new RestaurantDishesModel({
    ...foodDetails,
    image: foodDetails.file?.filename,
  });

  RestaurantDish.save();
  callback(null, { message: "Dish Added" });
};

exports.handle_request = handle_request;
