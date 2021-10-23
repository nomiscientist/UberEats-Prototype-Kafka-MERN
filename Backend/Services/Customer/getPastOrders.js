const Orders = require("../../Models/OrdersModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const getPastOrders = async (req, res) => {
  let order;

  try {
    if (req.body.orderStatus.length === 0) {
      console.log("without filter");
      order = await Orders.find({
        customerId: req.body.customerId,
      }).exec();
    } else {
      console.log("with filter");
      order = await Orders.find({
        customerId: req.body.customerId,
        finalStatus: req.body.orderStatus,
      }).exec();
    }

    if (order) {
      let listOfRestaurantIds = order.map((element) => {
        return element.restaurantId;
      });
      // console.log(" listOfRestaurantIds", listOfRestaurantIds);

      let restaurant = await RestaurantDetails.find({
        _id: { $in: listOfRestaurantIds },
      }).exec();

      // console.log(" restaurant", restaurant);

      let restaurantList = {};

      restaurant.forEach((element) => {
        restaurantList = {
          ...restaurantList,
          [element._id]: element.restaurantName,
        };
      });

      // console.log("restaurantList", restaurantList);

      let result = order.map((element) => {
        return {
          ...element._doc,
          restaurantName: restaurantList[element.restaurantId],
        };
      });

      // console.log("result", result);

      // result = JSON.parse(JSON.stringify(result));
      res.status(200).send(result);
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getPastOrders;

// if (req.body.orderStatus.length === 0) {
//   sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
//  and O.CustomerID = (?) `;
//   columnArray = [req.body.customerId];
// } else {
//   sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered , O.FinalStatus from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
//   and O.CustomerID = (?)  AND FinalStatus = (?)`;
//   columnArray = [req.body.customerId, req.body.orderStatus];
// }

// con.query(sqlSelect, columnArray, (err, result) => {
//   if (err) throw err;
//   if (result) {
//     res.status(200).send(
//       result.map((element) => {
//         return {
//           restaurantName: element.RestaurantName,
//           orderId: element.OrderId,
//           totalPrice: element.TotalPrice,
//           dateOrdered: element.DateOrdered,
//           totalItems: element.TotalQuantity,
//           orderStatus: element.FinalStatus,
//         };
//       })
//     );
//   }
// });
