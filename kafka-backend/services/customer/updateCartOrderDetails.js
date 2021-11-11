// const con = require("../../Controller/Common/dbConnection");
const OrderDetails = require("../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (cartDetails, callback) => {
  try {
    if (cartDetails.quantity === 0) {
      await OrderDetails.findOneAndDelete({
        _id: cartDetails._id,
      }).exec();

      // callback(null, []);
    } else {
      let orderDetail = await OrderDetails.findOne({
        _id: cartDetails._id,
      }).exec();

      if (orderDetail) {
        OrderDetails.updateOne(orderDetail, {
          quantity: cartDetails.quantity,
          amount: cartDetails.quantity * cartDetails.price,
        }).exec();
      }
    }

    let restaurant = await RestaurantDetails.findOne({
      _id: cartDetails.restaurantId,
    }).exec();

    let orderDetail = await OrderDetails.find({
      customerId: cartDetails.customerId,
      orderId: cartDetails.orderId,
    }).exec();

    let result = orderDetail.map((element) => {
      return {
        ...element._doc,
        restaurantName: restaurant.restaurantName,
      };
    });

    result = JSON.parse(JSON.stringify(result));
    callback(null, result);
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
