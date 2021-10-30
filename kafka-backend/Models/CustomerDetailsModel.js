const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CustomerDetailsSchema = new Schema(
  {
    emailId: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: false },
    state: { type: String, required: false },
    zipCode: { type: String, required: false },
    country: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    nickname: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    about: { type: String, required: false, default: "" },
    image: { type: String, required: false },
    favoriteRestaurant: { type: Array, required: false },
  },
  {
    versionKey: false,
  }
);

const CustomerDetails = mongoose.model("CustomerDetail", CustomerDetailsSchema);
module.exports = CustomerDetails;
