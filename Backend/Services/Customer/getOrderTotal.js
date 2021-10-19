const con = require("../../Controller/Common/dbConnection");

const getOrderTotal = (req, res) => {
  let customerId = req.query.customerId;
  let subTotal = 0;
  let totalItems = 0;

  let sqlSelOrderID = `SELECT OrderID from Orders where CustomerID= (?) and FinalStatus =(?)`;

  con.query(sqlSelOrderID, [customerId, "New"], (err, result) => {
    if (err) throw err;
    if (result) {
      let sqlSelect = `SELECT  * FROM OrderDetails where CustomerID = (?) AND OrderID = (?)`;

      con.query(sqlSelect, [customerId, result[0]?.OrderID], (err, result1) => {
        if (err) throw err;
        if (result1) {
          result1.forEach((element) => (subTotal += element.Amount));
          result1.forEach((element) => (totalItems += element.Quantity));
          res.status(200).send({ subTotal: subTotal, totalItems: totalItems });
        }
      });
    }
  });
};

module.exports = getOrderTotal;
