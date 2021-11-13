const Orders = require("../../Models/OrdersModel");

const handle_request = async (orderDetails, callback) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  try {
    console.log("aaj ka order **********", orderDetails);
    let order = await Orders.findOne({
      customerId: orderDetails.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        totalPrice: orderDetails.totalPrice,
        totalQuantity: orderDetails.totalItems,
        specialInstructions: orderDetails.specialInstructions,
        dateOrdered: date_ob,
        finalStatus: "New Order",
      }).exec();

      callback(null, {
        message: "order booked",
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
