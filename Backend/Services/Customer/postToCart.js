const con = require("../../Controller/Common/dbConnection");

const postToCart = (req, res) => {
  let subTotal = 0;
  let totalItems = 0;

  req.body.forEach((element) => {
    subTotal += element.Amount;
    totalItems += element.Quantity;
  });

  let sql =
    "UPDATE Orders SET  TotalPrice = ?, TotalItems = ? WHERE OrderId = ? ";

  con.query(sql, [subTotal, totalItems, req.body.OrderId], (err, result) => {
    if (err) throw err;

    if (result) {
      res.status(200).send({ subTotal: subTotal });
    }
  });
};

module.exports = postToCart;
