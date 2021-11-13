//const con = require('../../Controller/Common/dbConnection');
const Orders = require("../../Models/OrdersModel");

const handle_request = async (orderStatus, callback) => {
  try {
    let order = await Orders.findOne({
      _id: orderStatus.orderId,
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        finalStatus: orderStatus.orderStatus,
      }).exec();

      let result = await Orders.findOne({
        _id: orderStatus.orderId,
      }).exec();

      if (result) {
        callback(null, {
          orderId: result._id,
          totalPrice: result.totalPrice,
          totalQuantity: result.totalQuantity,
          deliveryAddress: result.deliveryAddress,
          dateOrdered: result.dateOrdered,
          orderStatus: result.finalStatus,
          customerId: result.customerId,
          deliveryOrPickup: result.deliveryOrPickup,
          specialInstructions: " ",
        });
      }
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
