const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var RestaurantDetailsSchema = new Schema(
  {
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    restaurantName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
    contactNumber: { type: String, required: true },
    openTime: { type: String, required: false, default: "00:00" },
    closeTime: { type: String, required: false, default: "00:00" },
    deliveryFlag: { type: String, required: false, default: "No" },
    pickupFlag: { type: String, required: false, default: "No" },
    about: { type: String, required: false, default: "" },
    image: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

const RestaurantDetails = mongoose.model(
  "RestaurantDetail",
  RestaurantDetailsSchema
);
module.exports = RestaurantDetails;
