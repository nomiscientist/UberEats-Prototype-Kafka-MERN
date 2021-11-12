const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var OrderDetailsSchema = new Schema(
  {
    orderId: { type: String, required: true },
    restaurantId: { type: String, required: true },
    customerId: { type: String, required: true },
    foodId: { type: String, required: true },
    dishName: { type: String, required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: false },
    amount: { type: Number, required: false },
  },
  {
    versionKey: false,
  }
);

const OrderDetails = mongoose.model("OrderDetail", OrderDetailsSchema);
module.exports = OrderDetails;
