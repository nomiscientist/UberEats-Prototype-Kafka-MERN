const con = require("../../Controller/Common/dbConnection");

const getFavoriteRestaurants = (req, res) => {
  let SelectSql = `select RestaurantID, RestaurantName, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture
  FROM RestaurantDetails where RestaurantID in (SELECT  RestaurantID from CustomerFavorites where CustomerID  = (?))`;

  con.query(SelectSql, [req.body.customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      result = JSON.parse(JSON.stringify(result));
      res.send(result);
    }
  });
};

module.exports = getFavoriteRestaurants;
