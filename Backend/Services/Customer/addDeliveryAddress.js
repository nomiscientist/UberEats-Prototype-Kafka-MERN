// const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");

const addDeliveryAddress = async (req, res) => {
  try {
    let order = await Orders.findOne({
      customerId: req.body.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      Orders.updateOne(order, {
        deliveryAddress: req.body.address,
      }).exec();

      res.status(200).send({
        message: "Delivery address added",
      });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = addDeliveryAddress;

// let sqlSelect = `UPDATE  Orders SET  DeliveryAddress = (?)  where CustomerID = (?) and FinalStatus = (?)`;

// con.query(
//   sqlSelect,
//   [req.body.address, req.body.customerId, "New"],
//   (err, result) => {
//     if (err) throw err;
//     if (result) {
//       res.status(200).send({
//         message: "Delivery address added",
//       });
//     }
//   }
// );
