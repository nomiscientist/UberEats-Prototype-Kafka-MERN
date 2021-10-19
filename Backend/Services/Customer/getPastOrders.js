const con = require("../../Controller/Common/dbConnection");

const getPastOrders = (req, res) => {
  let sqlSelect;
  let columnArray;

  if (req.body.orderStatus.length === 0) {
    sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
   and O.CustomerID = (?) `;
    columnArray = [req.body.customerId];
  } else {
    sqlSelect = `select R.RestaurantName, O.OrderId ,O.TotalPrice, O.TotalQuantity, O.DateOrdered , O.FinalStatus from Orders O, RestaurantDetails R where R.RestaurantID = O.RestaurantID
    and O.CustomerID = (?)  AND FinalStatus = (?)`;
    columnArray = [req.body.customerId, req.body.orderStatus];
  }

  con.query(sqlSelect, columnArray, (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send(
        result.map((element) => {
          return {
            restaurantName: element.RestaurantName,
            orderId: element.OrderId,
            totalPrice: element.TotalPrice,
            dateOrdered: element.DateOrdered,
            totalItems: element.TotalQuantity,
            orderStatus: element.FinalStatus,
          };
        })
      );
    }
  });
};

module.exports = getPastOrders;
