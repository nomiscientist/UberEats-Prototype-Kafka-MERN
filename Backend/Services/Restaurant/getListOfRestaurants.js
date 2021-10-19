const con = require("../../Controller/Common/dbConnection");
const sortListOfRestaurants = require("./sortListOfRestaurants");

const getListOfRestaurants = (req, res) => {
  let customerId = req.body.customerId;
  let selectSql;
  let columnsArray = [];

  let custSql = `SELECT City from CustomerDetails where CustomerID=?`;
  let receivedFlag = "No";
  let Flag;

  if (req.body.deliveryType === "delivery") {
    receivedFlag = "Yes";
    Flag = "DeliveryFlag";
  } else {
    receivedFlag = "Yes";
    Flag = "PickupFlag";
  }

  if (req.body.filter.length === 0 && req.body.typeaheadValue.length === 0) {
    selectSql = `SELECT RestaurantID, RestaurantName, Address, City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture , OpenTime, CloseTime
    from RestaurantDetails where ${Flag} = (?)`;
    columnsArray = [receivedFlag];
  } else if (
    req.body.filter.length > 0 &&
    req.body.typeaheadValue.length === 0
  ) {
    selectSql = `SELECT RestaurantID, RestaurantName, Address,City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture , OpenTime, CloseTime from 
    RestaurantDetails where RestaurantID in (SELECT distinct RestaurantID from FoodItems where FoodType in  (?)) AND ${Flag} = (?) `;
    columnsArray = [req.body.filter, receivedFlag];
  } else if (req.body.filter.length > 0 && req.body.typeaheadValue.length > 0) {
    selectSql = `SELECT RestaurantID, RestaurantName, Address,City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture ,OpenTime, CloseTime  
    from RestaurantDetails where RestaurantID in (SELECT distinct RestaurantID from FoodItems where FoodType in  (?)  and RestaurantID in  (?) ) AND ${Flag} = (?)`;
    columnsArray.push(req.body.filter);
    columnsArray.push(req.body.typeaheadValue);
    columnsArray.push(receivedFlag);
  } else if (
    req.body.filter.length === 0 &&
    req.body.typeaheadValue.length > 0
  ) {
    selectSql = `SELECT RestaurantID, RestaurantName, Address,City, State, Country, DeliveryFlag,PickupFlag, ProfilePicture ,OpenTime, CloseTime  from 
    RestaurantDetails where RestaurantID in (?) AND ${Flag} = (?)`;
    columnsArray.push(req.body.typeaheadValue);
    columnsArray.push(receivedFlag);
  }

  let customerLocation;
  console.log("column array", columnsArray);
  con.query(custSql, [customerId], (err, result) => {
    if (err) throw err;
    if (result) {
      result = JSON.parse(JSON.stringify(result));
      customerLocation = result[0].City;
    }

    let orderOfRestaurants;
    con.query(selectSql, columnsArray, (err, resultLast) => {
      if (err) throw err;

      if (resultLast) {
        con.query(
          "SELECT RestaurantID FROM CustomerFavorites where CustomerID = (?)",
          [customerId],
          (err, resultFavRest) => {
            if (err) throw err;

            let restaurantFavIds = resultFavRest.map((restau) => {
              return restau.RestaurantID;
            });

            if (resultFavRest) {
              orderOfRestaurants = sortListOfRestaurants(
                resultLast.map((restuarant) => {
                  let isLiked = false;

                  if (restaurantFavIds.includes(restuarant.RestaurantID)) {
                    isLiked = true;
                  }
                  return {
                    ...restuarant,
                    isLiked: isLiked,
                  };
                }),
                customerLocation
              );

              res.send(orderOfRestaurants);
            }
          }
        );
      }
    });
  });
};

module.exports = getListOfRestaurants;
