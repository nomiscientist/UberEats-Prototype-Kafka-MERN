const RestaurantDishes = require("../../Models/RestaurantDishesModel");
const multer = require("multer");

//API to edit food details on the restaurant page
const editFoodItems = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  try {
    RestaurantDishes.findOne(
      { _id: req.body.foodId, restaurantId: req.body.restaurantId },
      (error, restaurantDish) => {
        if (error) {
          throw error;
        }

        if (restaurantDish) {
          RestaurantDishes.updateOne(
            restaurantDish,
            {
              dishName: req.body.dishName,
              price: req.body.price,
              description: req.body.description,
              dishType: req.body.dishType,
              dishCategory: req.body.dishCategory,
              mainIngredients: req.body.ingredients,
              cuisine: req.body.cuisine,
              image: req.file?.filename,
            },
            (error, restaurantDish) => {
              if (error) {
                throw error;
              }

              if (restaurantDish) {
                console.log("Update successful!!");

                res.send({
                  responseFlag: "Success",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = editFoodItems;
