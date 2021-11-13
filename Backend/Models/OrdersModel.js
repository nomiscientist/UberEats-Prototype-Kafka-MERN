const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrdersSchema = new Schema(
  {
    restaurantId: { type: String, required: false },
    customerId: { type: String, required: true },
    totalPrice: { type: Number, required: false },
    totalQuantity: { type: Number, required: false },
    deliveryAddress: { type: String, required: false },
    dateOrdered: { type: Date, required: false },
    deliveryOrPickup: { type: String, required: false },
    finalStatus: { type: String, required: false },
    specialInstructions: { type: String, required: false },
  },
  {
    versionKey: false,
  }
);

const Orders = mongoose.model("Order", OrdersSchema);
module.exports = Orders;
