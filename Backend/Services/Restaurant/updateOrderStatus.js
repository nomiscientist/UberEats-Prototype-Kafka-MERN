const con = require("../../Controller/Common/dbConnection");

const updateOrderStatus = (req, res) => {
  let updateSql = `UPDATE Orders SET FinalStatus = "${req.body.orderStatus}" WHERE  OrderId = ?`;

  con.query(updateSql, [req.body.orderId], (err, result) => {
    if (err) throw err;

    if (result) {
      let sql = "SELECT * FROM Orders where OrderId =(?)";
      con.query(sql, [req.body.orderId], (err, result1) => {
        if (err) throw err;

        if (result1) {
          res.status(200).send({
            orderId: result1[0].OrderId,
            totalPrice: result1[0].TotalPrice,
            totalQuantity: result1[0].TotalQuantity,
            deliveryAddress: result1[0].DeliveryAddress,
            dateOrdered: result1[0].DateOrdered,
            orderStatus: result1[0].FinalStatus,
            customerId: result1[0].CustomerID,
            deliveryOrPickup: result1[0].DeliveryOrPickup,
          });
        }
      });
    }
  });
};

module.exports = updateOrderStatus;
