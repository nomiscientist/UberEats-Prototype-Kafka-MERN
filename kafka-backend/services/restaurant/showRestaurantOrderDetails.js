const OrderDetails = require("../../Models/OrderDetailsModel");

const handle_request = async (orderDetails, callback) => {
  try {
    orderDetail = await OrderDetails.find({
      orderId: orderDetails.orderId,
    }).exec();

    if (orderDetail) {
      let details = orderDetail.map((element) => {
        return {
          orderId: element.orderId,
          foodName: element.dishName,
          quantity: element.quantity,
          price: element.price,
          amount: element.amount,
        };
      });

      callback(null, details);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
