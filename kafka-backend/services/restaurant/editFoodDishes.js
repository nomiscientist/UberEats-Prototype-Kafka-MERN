const RestaurantDishes = require("../../Models/RestaurantDishesModel");
//const multer = require("multer");

//API to edit food details on the restaurant page
// const editFoodItems = (req, res, err) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(500).json(err);
//   }

const handle_request = async (foodDetails, callback) => {
  try {
    const filter = {
      _id: foodDetails.foodId,
      restaurantId: foodDetails.restaurantId,
    };
    const update = {
      dishName: foodDetails.dishName,
      price: foodDetails.price,
      description: foodDetails.description,
      dishType: foodDetails.dishType,
      dishCategory: foodDetails.dishCategory,
      mainIngredients: foodDetails.ingredients,
      cuisine: foodDetails.cuisine,
      image: foodDetails.image,
    };

    let restaurantDish = await RestaurantDishes.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    if (restaurantDish) {
      console.log("Update successful!!");
      callback(null, { responseFlag: "Success" });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
