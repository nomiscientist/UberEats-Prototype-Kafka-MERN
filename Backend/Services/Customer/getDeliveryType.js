const con = require("../../Controller/Common/dbConnection");

const getDeliveryType = (req, res) => {
  let sqlSelect = `SELECT OrderId, DeliveryOrPickup  from Orders where CustomerID=? and FinalStatus = ?`;

  con.query(sqlSelect, [req.query.customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        orderId: result[0].OrderId,
        deliveryType: result[0].DeliveryOrPickup,
      });
    }
  });
};

module.exports = getDeliveryType;
