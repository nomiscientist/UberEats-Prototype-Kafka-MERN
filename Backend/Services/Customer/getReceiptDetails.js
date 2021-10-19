const con = require("../../Controller/Common/dbConnection");

const getReceiptDetails = (req, res) => {
  let sqlSelect = `SELECT  FoodName, Price, Quantity FROM OrderDetails where OrderId = (?) `;

  con.query(sqlSelect, [req.body.orderId], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send(
        result.map((element) => {
          return {
            foodName: element.FoodName,
            price: element.Price,
            quantity: element.Quantity,
          };
        })
      );
    }
  });
};

module.exports = getReceiptDetails;
