var mysql = require("mysql");

var con = mysql.createConnection({
  host: "cmpe273.cue0nkfbl9xm.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "archita22",
  database: "UberEats",
});

module.exports = con;
