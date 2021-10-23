//const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");

const bookOrder = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  try {
    let order = await Orders.findOne({
      customerId: req.body.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        totalPrice: req.body.totalPrice,
        totalQuantity: req.body.totalItems,
        dateOrdered: date_ob,
        finalStatus: "New Order",
      }).exec();

      res.status(200).send({
        message: "Delivery address added",
      });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = bookOrder;

let Updatesql = `UPDATE Orders SET  TotalPrice = (?), TotalQuantity=(?), DateOrdered = (?), FinalStatus =(?) where CustomerID = (?) and FinalStatus = (?)`;

// con.query(
//   Updatesql,
//   [
//     req.body.totalPrice,
//     req.body.totalItems,
//     date_ob,
//     "New Order",
//     req.body.customerId,
//     "New",
//   ],
//   (err, result) => {
//     if (err) throw err;
//     if (result) {
//       res.status(200).send({ Message: "Order Booked!" });
//     }
//   }
// );
