const Orders = require("../../Models/OrdersModel");

const getRestaurantOrders = async (req, res) => {
  let order;

  try {
    if (req.body.orderStatus.length > 0) {
      order = await Orders.find({
        restaurantId: req.body.restaurantId,
        finalStatus: req.body.orderStatus,
      })
        .sort({ dateOrdered: "descending" })
        .exec();
    } else {
      order = await Orders.find({
        restaurantId: req.body.restaurantId,
        finalStatus: { $ne: "New" },
      })
        .sort({ dateOrdered: "descending" })
        .exec();
    }

    if (order) {
      res.status(200).send(
        order.map((element) => {
          return {
            _id: element.id,
            totalPrice: element.totalPrice,
            totalQuantity: element.totalQuantity,
            deliveryAddress: element.deliveryAddress,
            dateOrdered: element.dateOrdered,
            orderStatus: element.finalStatus,
            customerId: element.customerId,
            deliveryType: element.deliveryOrPickup,
          };
        })
      );
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getRestaurantOrders;

// let sqlSelect;
// let columnArray;

// if (req.body.orderStatus.length > 0) {
//   sqlSelect = `SELECT   OrderID,TotalPrice, TotalQuantity, DeliveryAddress, DateOrdered ,FinalStatus
//    ,CustomerID , DeliveryOrPickup FROM Orders
//    where RestaurantID = (?) AND FinalStatus = (?) ORDER BY DateOrdered DESC`;
//   columnArray = [req.body.restaurantId, req.body.orderStatus];
// } else {
//   sqlSelect = `SELECT   OrderID,TotalPrice, TotalQuantity, DeliveryAddress, DateOrdered ,
//   FinalStatus, CustomerID , DeliveryOrPickup FROM Orders where RestaurantID = ?
//   AND FinalStatus <> "${"New"}" ORDER BY DateOrdered DESC`;
//   columnArray = [req.body.restaurantId];
// }

// con.query(sqlSelect, columnArray, (err, result) => {
//   if (err) throw err;

//   if (result) {
//     res.status(200).send(
//       result.map((element) => {
//         return {
//           orderId: element.OrderID,
//           totalPrice: element.TotalPrice,
//           totalQuantity: element.TotalQuantity,
//           deliveryAddress: element.DeliveryAddress,
//           dateOrdered: element.DateOrdered,
//           orderStatus: element.FinalStatus,
//           customerId: element.CustomerID,
//           deliveryType: element.DeliveryOrPickup,
//         };
//       })
//     );
//   }
// });
