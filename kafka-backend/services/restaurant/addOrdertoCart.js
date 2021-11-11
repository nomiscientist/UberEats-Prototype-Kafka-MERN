const CustomerDetails = require("../../Models/CustomerDetailsModel");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const handle_request = async (cartDetails, callback) => {
  let mainOrderId;

  if (cartDetails.quantity === 0) {
    callback(null, { Message: "No Dish added as quantity is 0" });
    return;
  }

  if (!cartDetails.quantity) {
    callback(null, { Message: "No Dish added as quantity is 0" });
    return;
  }

  try {
    let order = await Orders.findOne({
      customerId: cartDetails.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      mainOrderId = order._id;

      let orderDetail = await new OrderDetails({
        orderId: mainOrderId,
        foodId: cartDetails.foodId,
        restaurantId: cartDetails.restaurantId,
        customerId: cartDetails.customerId,
        dishName: cartDetails.foodName,
        price: cartDetails.dishPrice,
        quantity: cartDetails.quantity,
        amount: cartDetails.dishPrice * cartDetails.quantity,
      });
      orderDetail.save();

      callback(null, { Message: "Added to cart", orderId: mainOrderId });
    } else {
      let order = await new Orders({
        restaurantId: cartDetails.restaurantId,
        customerId: cartDetails.customerId,
        finalStatus: "New",
        deliveryOrPickup: cartDetails.deliveryType,
      });

      order.save();

      mainOrderId = order._id;

      let orderDetail = await new OrderDetails({
        orderId: mainOrderId,
        foodId: cartDetails.foodId,
        restaurantId: cartDetails.restaurantId,
        customerId: cartDetails.customerId,
        dishName: cartDetails.foodName,
        price: cartDetails.dishPrice,
        quantity: cartDetails.quantity,
        amount: cartDetails.dishPrice * cartDetails.quantity,
      });
      orderDetail.save();

      callback(null, { Message: "Added to cart", orderId: mainOrderId });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
