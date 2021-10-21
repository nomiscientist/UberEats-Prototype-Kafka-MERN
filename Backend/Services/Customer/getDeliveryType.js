// const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");

const getDeliveryType = async (req, res) => {
  try {
    let order = await Orders.findOne({
      customerId: req.query.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      res.status(200).send({
        orderId: order._id,
        deliveryType: order.deliveryOrPickup,
      });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getDeliveryType;

// let sqlSelect = `SELECT OrderId, DeliveryOrPickup  from Orders where CustomerID=? and FinalStatus = ?`;

// con.query(sqlSelect, [req.query.customerId, "New"], (err, result) => {
//   if (err) throw err;
//   if (result) {
//     res.status(200).send({
//       orderId: result[0].OrderId,
//       deliveryType: result[0].DeliveryOrPickup,
//     });
//   }
// });
