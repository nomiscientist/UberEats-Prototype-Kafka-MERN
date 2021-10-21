const multer = require("multer");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");

const foodItemsDisplay = (req, res, err) => {
  let id = req.query.restaurantId;

  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  try {
    RestaurantDishes.find(
      { restaurantId: req.query.restaurantId },
      (error, restaurantDishes) => {
        if (error) {
          throw error;
        }

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

          res.send(responseList);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = foodItemsDisplay;
