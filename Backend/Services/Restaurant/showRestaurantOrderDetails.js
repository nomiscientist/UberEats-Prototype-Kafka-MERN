const con = require("../../Controller/Common/dbConnection");

const showRestaurantOrderDetails = (req, res) => {
  sqlSelect = `SELECT OrderID,FoodName, Quantity, Price, Amount  FROM OrderDetails where OrderID = (?) `;

  con.query(sqlSelect, [req.body.orderId], (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send(
        result.map((element) => {
          return {
            orderId: element.OrderID,
            foodName: element.FoodName,
            quantity: element.Quantity,
            price: element.Price,
            amount: element.Amount,
          };
        })
      );
    }
  });
};

module.exports = showRestaurantOrderDetails;
