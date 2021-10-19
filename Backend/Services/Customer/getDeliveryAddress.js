const con = require("../../Controller/Common/dbConnection");

const getDeliveryAddress = (req, res) => {
  let sqlSelect = `SELECT  AddressLine1, AddressLine2, City  FROM CustomerDetails where CustomerID = (?) `;

  con.query(sqlSelect, [req.query.customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      res.status(200).send({
        addressLine1: result[0].AddressLine1,
        addressLine2: result[0].AddressLine2,
        city: result[0].City,
      });
    }
  });
};

module.exports = getDeliveryAddress;
