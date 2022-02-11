var mysql = require("mysql");

var con = mysql.createConnection({
  host: "",
  user: "",
  password: "",
  database: "",
});

module.exports = con;
