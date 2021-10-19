const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RestaurantDishesSchema = new Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantDetails",
      required: true,
    },
    dishName: { type: String, required: false },
    price: { type: Number, required: false },
    description: { type: String, required: false },
    dishType: { type: String, required: false },
    dishCategory: { type: String, required: false },
    mainIngredients: { type: String, required: false },
    cuisine: { type: String, required: false },
    image: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

const RestaurantDishes = mongoose.model(
  "RestaurantDish",
  RestaurantDishesSchema
);
module.exports = RestaurantDishes;
