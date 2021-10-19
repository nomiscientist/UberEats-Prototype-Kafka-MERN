const con = require("../../Controller/Common/dbConnection");

const createFavouritesList = (req, res) => {
  let sql = `Select * from CustomerFavorites where RestaurantID =(?) AND  CustomerID =(?)`;

  con.query(
    sql,
    [req.body.restaurantId, req.body.customerId],
    (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        let delSql =
          "DELETE FROM CustomerFavorites WHERE RestaurantID =(?) AND  CustomerID =(?)";

        con.query(
          delSql,
          [req.body.restaurantId, req.body.customerId],
          (err, result1) => {
            if (err) throw err;
            if (result1)
              res.send({
                restaurantID: req.body.restaurantId,
              });
          }
        );
      } else {
        let sqlInsert = `INSERT INTO CustomerFavorites ( RestaurantID, CustomerID) VALUES (?,?)`;
        con.query(
          sqlInsert,
          [req.body.restaurantId, req.body.customerId],
          (err, result2) => {
            if (err) throw err;
            if (result2)
              res.send({
                restaurantID: req.body.restaurantId,
              });
          }
        );
      }
    }
  );
};

module.exports = createFavouritesList;
