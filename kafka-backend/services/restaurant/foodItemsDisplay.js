const multer = require("multer");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");

const handle_request = async (foodDetails, callback) => {
  let id = foodDetails.restaurantId;

  try {
    let restaurantDishes = await RestaurantDishes.find({
      restaurantId: foodDetails.restaurantId,
    });

    if (restaurantDishes) {
      let responseList = restaurantDishes.map((row) => {
        return {
          foodId: row._id,
          restaurantId: row.restaurantId,
          dishName: row.dishName,
          price: row.price,
          description: row.description,
          dishType: row.dishType,
          dishCategory: row.dishCategory,
          mainIngredients: row.ingredients,
          cuisine: row.cuisine,
          image: row.image,
        };
      });

      callback(null, responseList);
    } else {
      throw error;
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
