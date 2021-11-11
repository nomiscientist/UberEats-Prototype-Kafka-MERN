// const con = require("../../Controller/Common/dbConnection");

// const updateTotalItems = (customerId) => {
//   let totalQuantity = 0;
//   let sql = `SELECT Quantity , OrderId from OrderDetails where CustomerId = (?) `;

//   con.query(sql, [customerId], (err, result) => {
//     if (err) throw err;
//     if (result) {
//       result.forEach((element) => {
//         totalQuantity += element.Quantity;
//       });

//       let Updatesql = `UPDATE Orders SET  TotalQuantity = (?), FinalStatus=(?) where OrderId = (?)`;

//       con.query(
//         Updatesql,
//         [totalQuantity, "Order Received", result[0].OrderId],
//         (err, result1) => {
//           if (err) throw err;

//           if (result1) {
//             res.status(200).send({
//               message: "Order status updated",
//             });
//           }
//         }
//       );
//     }
//   });
// };

// module.exports = updateTotalItems;
