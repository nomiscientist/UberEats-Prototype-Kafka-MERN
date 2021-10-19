const con = require("../../Controller/Common/dbConnection");

const bookOrder = (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);

  let Updatesql = `UPDATE Orders SET  TotalPrice = (?), TotalQuantity=(?), DateOrdered = (?), FinalStatus =(?) where CustomerID = (?) and FinalStatus = (?)`;

  con.query(
    Updatesql,
    [
      req.body.totalPrice,
      req.body.totalItems,
      date_ob,
      "New Order",
      req.body.customerId,
      "New",
    ],
    (err, result) => {
      if (err) throw err;
      if (result) {
        res.status(200).send({ Message: "Order Booked!" });
      }
    }
  );
};

module.exports = bookOrder;
