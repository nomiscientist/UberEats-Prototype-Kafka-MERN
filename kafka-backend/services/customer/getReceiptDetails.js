const OrderDetails = require("../../Models/OrderDetailsModel");

const handle_request = async (receiptDetails, callback) => {
  try {
    let orderDetail = await OrderDetails.find({
      orderId: receiptDetails.orderId,
    }).exec();

    if (orderDetail) {
      callback(
        null,
        orderDetail.map((element) => {
          return {
            foodName: element.dishName,
            price: element.price,
            quantity: element.quantity,
          };
        })
      );
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
