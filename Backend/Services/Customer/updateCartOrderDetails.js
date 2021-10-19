const con = require("../../Controller/Common/dbConnection");

const updateCartOrderDetails = (req, res) => {
  if (req.body.Quantity === 0) {
    let sqlDelete = `DELETE FROM OrderDetails WHERE OrderDetailId = ?`;
    con.query(sqlDelete, [req.body.OrderDetailId], (err, result) => {
      if (err) throw err;
    });
  } else {
    let sqlUpdate = `UPDATE OrderDetails SET  Quantity = ? , Amount=?  WHERE  OrderDetailId = ? `;

    con.query(
      sqlUpdate,
      [
        req.body.Quantity,
        req.body.Quantity * req.body.Price,
        req.body.OrderDetailId,
      ],
      (err, result) => {
        if (err) throw err;
      }
    );
  }

  let sqlSelect = `SELECT O.* , R.RestaurantName FROM  OrderDetails  O  , RestaurantDetails R WHERE  O.RestaurantID= R.RestaurantID AND O.CustomerID= ?  AND O.OrderId = ?`;

  con.query(
    sqlSelect,
    [req.body.CustomerID, req.body.OrderId],
    (err, result) => {
      if (err) throw err;

      if (result) {
        res.send(result);
      }
    }
  );
};

module.exports = updateCartOrderDetails;
