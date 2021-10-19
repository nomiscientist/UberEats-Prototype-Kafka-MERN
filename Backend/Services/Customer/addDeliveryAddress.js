const con = require("../../Controller/Common/dbConnection");

const addDeliveryAddress = (req, res) => {
  let sqlSelect = `UPDATE  Orders SET  DeliveryAddress = (?)  where CustomerID = (?) and FinalStatus = (?)`;

  con.query(
    sqlSelect,
    [req.body.address, req.body.customerId, "New"],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send({
          message: "Delivery address added",
        });
      }
    }
  );
};

module.exports = addDeliveryAddress;
