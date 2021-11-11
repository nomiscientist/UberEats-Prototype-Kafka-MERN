// const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (cartDetails, callback) => {
  try {
    let order = await Orders.findOne({
      customerId: cartDetails.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      let orderDetail = await OrderDetails.find({
        customerId: cartDetails.customerId,
        orderId: order._id,
      }).exec();

      let restaurant = await RestaurantDetails.find({
        _id: order.restaurantId,
      }).exec();

      let result = orderDetail.map((element) => {
        return {
          ...element._doc,
          restaurantName: restaurant[0].restaurantName,
        };
      });

      result = JSON.parse(JSON.stringify(result));
      callback(null, result);
    } else {
      callback(null, []);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
