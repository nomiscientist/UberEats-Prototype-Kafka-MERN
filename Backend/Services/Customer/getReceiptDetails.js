//const con = require("../../Controller/Common/dbConnection");
const OrderDetails = require("../../Models/OrderDetailsModel");

const getReceiptDetails = async (req, res) => {
  try {
    let orderDetail = await OrderDetails.find({
      orderId: req.body.orderId,
    }).exec();

    if (orderDetail) {
      res.status(200).send(
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
    res.sendStatus(500);
  }
};

module.exports = getReceiptDetails;

// let sqlSelect = `SELECT  FoodName, Price, Quantity FROM OrderDetails where OrderId = (?) `;

// con.query(sqlSelect, [req.body.orderId], (err, result) => {
//   if (err) throw err;
//   if (result) {
//     res.status(200).send(
//       result.map((element) => {
//         return {
//           foodName: element.FoodName,
//           price: element.Price,
//           quantity: element.Quantity,
//         };
//       })
//     );
//   }
// });
