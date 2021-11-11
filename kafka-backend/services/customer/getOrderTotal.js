//const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const handle_request = async (orderDetails, callback) => {
  try {
    let subTotal = 0;
    let totalItems = 0;

    let order = await Orders.findOne({
      customerId: orderDetails.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      let orderId = order._id;

      let orderDetail = await OrderDetails.find({
        customerId: orderDetails.customerId,
        orderId: orderId,
      }).exec();

      if (orderDetail) {
        orderDetail.forEach((element) => (subTotal += element.amount));
        orderDetail.forEach((element) => (totalItems += element.quantity));

        callback(null, { subTotal: subTotal, totalItems: totalItems });
      }
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
