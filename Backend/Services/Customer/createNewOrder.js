const con = require("../../Controller/Common/dbConnection");

const createNewOrder = (req, res) => {
  let customerId = req.body.customerId;

  let sqlSelect = `SELECT OrderId from Orders where CustomerID = (?) AND FinalStatus= (?)`;
  console.log("cust id", customerId);
  con.query(sqlSelect, [customerId, "New"], (err, result) => {
    if (err) throw err;

    if (result) {
      console.log("order id", result, result[0].OrderId);
      let sqlDelete = "DELETE FROM OrderDetails WHERE OrderId =?";

      con.query(sqlDelete, [result[0].OrderId], (err, result1) => {
        if (err) throw err;
        console.log("order id", result[0].OrderId);
        if (result1) {
          let sqlUpdate = `UPDATE Orders SET  RestaurantId = ?  WHERE  OrderId = ? `;
          console.log("order id", result[0].OrderId);
          con.query(
            sqlUpdate,
            [req.body.restaurantId, result[0].OrderId],
            (err, result2) => {
              if (err) throw err;

              if (result2) {
                let sqlInsert =
                  "INSERT INTO OrderDetails (OrderId, FoodId, RestaurantID, CustomerId, FoodName, Price ,Quantity, Amount) VALUES (?,?,?,?,?,?,?,?)";
                let columnArray = [
                  result[0].OrderId,
                  req.body.foodId,
                  req.body.restaurantId,
                  req.body.customerId,
                  req.body.foodName,
                  req.body.dishPrice,
                  req.body.quantity,
                  req.body.dishPrice * req.body.quantity,
                ];

                con.query(sqlInsert, columnArray, (err, result3) => {
                  if (err) throw err;

                  if (result3) {
                    res.send({
                      Message: "Added to cart",
                      orderId: result[0].OrderId,
                    });
                  }
                });
              }
            }
          );
        }
      });
    }
  });
};

module.exports = createNewOrder;
