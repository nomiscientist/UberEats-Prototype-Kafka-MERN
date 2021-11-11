const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const RestaurantDishesModel = require("../../Models/RestaurantDishesModel");

const multer = require("multer");

//API to food details on the restaurant page
// const addFoodDishes = (req, res, err) => {

const handle_request = async (foodDetails, callback) => {
  // if (err instanceof multer.MulterError) {
  //   return res.status(500).json(err);
  // }
  console.log("req body", foodDetails);
  const RestaurantDish = new RestaurantDishesModel({
    ...foodDetails,
    image: foodDetails.file?.filename,
  });

  RestaurantDish.save();
  callback(null, { message: "Dish Added" });
  // res.status(200).send({ message: "Dish Added" });
};

exports.handle_request = handle_request;
