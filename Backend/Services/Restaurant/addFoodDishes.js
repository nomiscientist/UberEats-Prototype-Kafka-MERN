const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const RestaurantDishesModel = require("../../Models/RestaurantDishesModel");
const multer = require("multer");

//API to food details on the restaurant page
const addFoodDishes = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }
  console.log("req body", req.body);
  const RestaurantDish = new RestaurantDishesModel({
    ...req.body,
    image: req.file?.filename,
  });
  console.log("daalna kya", RestaurantDish);
  RestaurantDish.save();

  res.status(200).send({ message: "Dish Added" });
};

module.exports = addFoodDishes;
