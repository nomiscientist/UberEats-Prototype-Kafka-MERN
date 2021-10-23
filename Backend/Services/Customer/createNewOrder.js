//const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const createNewOrder = async (req, res) => {
  let customerId = req.body.customerId;

  try {
    let order = await Orders.findOne({
      customerId: customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      let orderId = order._id;
      await OrderDetails.findManyAndDelete({
        orderId: orderId,
      }).exec();

      await Orders.updateOne(order, {
        restaurantId: req.body.restaurantId,
      });

      let orderDetail = await new OrderDetails({
        orderId: orderId,
        foodId: req.body.foodId,
        restaurantId: req.body.restaurantId,
        customerId: req.body.customerId,
        dishName: req.body.foodName,
        price: req.body.dishPrice,
        quantity: req.body.quantity,
        amount: req.body.dishPrice * req.body.quantity,
      });
      await orderDetail.save();

      res.send({
        Message: "Added to cart",
        orderId: OrderId,
      });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = createNewOrder;

// let sqlSelect = `SELECT OrderId from Orders where CustomerID = (?) AND FinalStatus= (?)`;
//   console.log("cust id", customerId);
//   con.query(sqlSelect, [customerId, "New"], (err, result) => {
//     if (err) throw err;

// if (result) {
//   console.log("order id", result, result[0].OrderId);
// let sqlDelete = "DELETE FROM OrderDetails WHERE OrderId =?";

// con.query(sqlDelete, [result[0].OrderId], (err, result1) => {
//   if (err) throw err;
//   console.log("order id", result[0].OrderId);
// if (result1) {
//   let sqlUpdate = `UPDATE Orders SET  RestaurantId = ?  WHERE  OrderId = ? `;
//   console.log("order id", result[0].OrderId);
//   con.query(
//     sqlUpdate,
//     [req.body.restaurantId, result[0].OrderId],
//     (err, result2) => {
//       if (err) throw err;

//       if (result2) {
//         let sqlInsert =
//   "INSERT INTO OrderDetails (OrderId, FoodId, RestaurantID, CustomerId, FoodName, Price ,Quantity, Amount) VALUES (?,?,?,?,?,?,?,?)";
// let columnArray = [
//   result[0].OrderId,
//   req.body.foodId,
//   req.body.restaurantId,
//   req.body.customerId,
//   req.body.foodName,
//   req.body.dishPrice,
//   req.body.quantity,
//   req.body.dishPrice * req.body.quantity,
// ];

// con.query(sqlInsert, columnArray, (err, result3) => {
//   if (err) throw err;

//   if (result3) {
//                   res.send({
//                     Message: "Added to cart",
//                     orderId: result[0].OrderId,
//                   });
//                 }
//               });
//             }
//           }
//         );
//       }
//     });
//   }
// });
