const OrderDetails = require("../../Models/OrderDetailsModel");

const showRestaurantOrderDetails = async (req, res) => {
  try {
    orderDetail = await OrderDetails.find({
      orderId: req.body.orderId,
    }).exec();

    if (orderDetail) {
      res.status(200).send(
        orderDetail.map((element) => {
          return {
            orderId: element.orderId,
            foodName: element.dishName,
            quantity: element.quantity,
            price: element.price,
            amount: element.amount,
          };
        })
      );
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = showRestaurantOrderDetails;

// sqlSelect = `SELECT OrderID,FoodName, Quantity, Price, Amount  FROM OrderDetails where OrderID = (?) `;

// con.query(sqlSelect, [req.body.orderId], (err, result) => {
//   if (err) throw err;

//   if (result) {
//     res.status(200).send(
//       result.map((element) => {
//         return {
//           orderId: element.OrderID,
//           foodName: element.FoodName,
//           quantity: element.Quantity,
//           price: element.Price,
//           amount: element.Amount,
//         };
//       })
//     );
//   }
// });
