const con = require("../../Controller/Common/dbConnection");

const showCartDetails = (req, res) => {
  let sqlSelOrderID = `SELECT OrderID from Orders where CustomerID= (?) and FinalStatus =(?)`;

  con.query(sqlSelOrderID, [req.body.customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      let sqlSelect = `SELECT O.*, R.RestaurantName FROM OrderDetails  O , RestaurantDetails  R
        WHERE  O.RestaurantID = R.RestaurantID AND O.OrderId= (?) AND  O.CustomerID= (?) `;
      con.query(
        sqlSelect,
        [result[0].OrderID, req.body.customerId],
        (err, result1) => {
          if (err) throw err;
          if (result1) {
            res.status(200).send(result1);
          }
        }
      );
    } else {
      res.status(200).send([]);
    }
  });
};

module.exports = showCartDetails;
