//const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");

const postToCart = (req, res) => {
  try {
    let subTotal = 0;
    let totalItems = 0;

    req.body.forEach((element) => {
      subTotal += element.amount;
      totalItems += element.quantity;
    });

    let order = await Orders.findOne({
      _id: req.body._id,
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        totalPrice: subTotal,
        totalQuantity: totalItems,
      }).exec();

      res.status(200).send({ subTotal: subTotal });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = postToCart;

// let sql =
//   "UPDATE Orders SET  TotalPrice = ?, TotalItems = ? WHERE OrderId = ? ";

// con.query(sql, [subTotal, totalItems, req.body.OrderId], (err, result) => {
//   if (err) throw err;

//   if (result) {
//     res.status(200).send({ subTotal: subTotal });
//   }
// });
