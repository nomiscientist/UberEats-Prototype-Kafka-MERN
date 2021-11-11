const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const handle_request = async (customerDetails, callback) => {
  let customerId = customerDetails.customerId;
  console.log("customerDetails", customerDetails);
  try {
    let order = await Orders.findOne({
      customerId: customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      console.log("heloo");
      let orderId = order._id;
      await OrderDetails.deleteMany({
        orderId: orderId,
      }).exec();

      await Orders.updateOne(order, {
        restaurantId: customerDetails.restaurantId,
      });

      let orderDetail = await new OrderDetails({
        orderId: orderId,
        foodId: customerDetails.foodId,
        restaurantId: customerDetails.restaurantId,
        customerId: customerDetails.customerId,
        dishName: customerDetails.foodName,
        price: customerDetails.dishPrice,
        quantity: customerDetails.quantity,
        amount: customerDetails.dishPrice * customerDetails.quantity,
      });
      await orderDetail.save();

      callback(null, {
        Message: "Added to cart",
        orderId: orderId,
      });
    }
  } catch (exception) {
    console.log("error kya?", exception);
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
