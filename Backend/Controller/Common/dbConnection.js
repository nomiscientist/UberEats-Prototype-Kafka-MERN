var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cmpe273.cue0nkfbl9xm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "archita22",
  database: "UberEats",
});

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "pikutuku",
//   database: "mydb",
// });

// var con = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "pikutuku",
//   database: "mydb",
//   debug: false,
// });

// var con = mysql.createPool({
//   connectionLimit: 100,
//   host: "cmpe273.cue0nkfbl9xm.us-east-2.rds.amazonaws.com",
//   user: "admin",
//   password: "archita22",
//   database: "UberEats",
//   debug: false,
// });

// try {
//   con.connect(function (err) {
//     // if (err) throw err;
//     if (err) {
//       console.log("Error while connecting to database", err);
//     } else {
//       console.log("Connected!");
//     }
//   });
// } catch (error) {
//   console.log("Error while connecting to mySQL");
// }

module.exports = con;
