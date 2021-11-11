const Orders = require("../../Models/OrdersModel");

const handle_request = async (customerDetails, callback) => {
  try {
    let order = await Orders.findOne({
      customerId: customerDetails.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        deliveryAddress: customerDetails.address,
      }).exec();

      callback(null, {
        message: "Delivery address added",
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
