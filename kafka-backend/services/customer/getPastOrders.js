const Orders = require("../../Models/OrdersModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (orderDetails, callback) => {
  let order;

  try {
    if (orderDetails.orderStatus.length === 0) {
      order = await Orders.find({
        customerId: orderDetails.customerId,
      }).exec();
    } else {
      order = await Orders.find({
        customerId: orderDetails.customerId,
        finalStatus: orderDetails.orderStatus,
      }).exec();
    }

    if (order) {
      let listOfRestaurantIds = order.map((element) => {
        return element.restaurantId;
      });

      let restaurant = await RestaurantDetails.find({
        _id: { $in: listOfRestaurantIds },
      }).exec();

      let restaurantList = {};

      restaurant.forEach((element) => {
        restaurantList = {
          ...restaurantList,
          [element._id]: element.restaurantName,
        };
      });

      let result = order.map((element) => {
        return {
          ...element._doc,
          restaurantName: restaurantList[element.restaurantId],
        };
      });

      callback(null, result);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
