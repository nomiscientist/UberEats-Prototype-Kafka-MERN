//const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const getOrderTotal = async (req, res) => {
  try {
    let subTotal = 0;
    let totalItems = 0;

    let order = await Orders.findOne({
      customerId: req.query.customerId,
      finalStatus: "New",
    }).exec();
    // console.log("order", order);
    let orderId = order._id;

    let orderDetail = await OrderDetails.find({
      customerId: req.query.customerId,
      orderId: orderId,
    }).exec();

    // console.log("orderDetail", orderDetail);

    if (orderDetail) {
      orderDetail.forEach((element) => (subTotal += element.amount));
      orderDetail.forEach((element) => (totalItems += element.quantity));

      // console.log(subTotal, subTotal);

      res.status(200).send({ subTotal: subTotal, totalItems: totalItems });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getOrderTotal;

//     let sqlSelect = `SELECT  * FROM OrderDetails where CustomerID = (?) AND OrderID = (?)`;

//     con.query(sqlSelect, [customerId, result[0]?.OrderID], (err, result1) => {
//       if (err) throw err;
//       if (result1) {
//         result1.forEach((element) => (subTotal += element.Amount));
//         result1.forEach((element) => (totalItems += element.Quantity));
//         res.status(200).send({ subTotal: subTotal, totalItems: totalItems });
//       }
//     });
//   }
// });
