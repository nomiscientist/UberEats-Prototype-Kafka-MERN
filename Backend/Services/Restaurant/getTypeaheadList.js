const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const RestaurantDishes = require("../../Models/RestaurantDishesModel");

const getTypeaheadList = (req, res) => {
  let listOfTypeahead = [];

  let flag;

  if (req.body.deliveryType === "delivery") {
    flag = "deliveryFlag";
  } else {
    flag = "pickupFlag";
  }
  //, city: /.*req.body.input*./
  const inputValue = req.body.input;
  console.log("inputValue", inputValue);
  try {
    RestaurantDetails.find(
      { [flag]: "Yes", city: /.*[inputValue]*./ },
      (error, restaurantDetail) => {
        if (error) {
          throw error;
        }
        console.log("restaurantDetail", restaurantDetail);
        if (restaurantDetail) {
          let tempObject = {};

          restaurantDetail.forEach((v) => {
            tempObject[v.city]
              ? tempObject[v.city].push(v._Id)
              : (tempObject[v.city] = [v._Id]);
          });

          Object.keys(tempObject).forEach((keyValue) => {
            listOfTypeahead.push({
              name: keyValue,
              id: tempObject[keyValue],
              isRestaurant: false,
            });
          });
        }
      }
    );
    //first part end

    RestaurantDetails.find(
      { $flag: "Yes", restaurantName: /.*req.body.input*./ },
      (error, restaurantDetail) => {
        if (error) {
          throw error;
        }

        if (restaurantDetail) {
          restaurantDetail.forEach((v) => {
            listOfTypeahead.push({
              name: v.restaurantName,
              id: [v._Id],
              isRestaurant: true,
            });
          });
        }
      }
    ); //end of second part

    // const aggregate = RestaurantDishes.aggregate([
    //   {
    //     $match: { foodName: /.*req.body.input*./ },
    //   },
    //   {
    //     $lookup: {
    //       from: "restaurantdetails",
    //       localField: "restaurantId",
    //       foreignField: "_id",
    //       as: "restaurantFoodList",
    //     },
    //   },
    //   {
    //     $unwind: "$restaurantFoodList",
    //   },
    //   {$match : {"restaurantdetails.via":"facebook"}},
    //   {
    //     $project : {

    //         "restaurantFoodList._id": 0,
    //         "restaurantFoodList.": 0,
    //         "restaurantFoodList.mob": 0
    //     }
    //   }
    // ]);

    console.log("array", listOfTypeahead);

    res.send(listOfTypeahead);
  } catch (exception) {
    res.sendStatus(500);
  }
};

//   let selectSql2 = `SELECT F.FoodName , R.RestaurantID , R.City from  FoodItems F, RestaurantDetails  R where F.RestaurantID = R.RestaurantID and  (FoodName
//    like '%${req.body.input}%'  or CuisineType like '%${req.body.input}%'   ) AND   R.${flag} = ?`;

//   con.query(selectSql2, ["Yes"], (err, result2) => {
//     if (err) throw err;

//     if (result2) {
//       let tempObject = {};

//       result2.forEach((value) => {
//         if (tempObject[value.FoodName]) {
//           tempObject[value.FoodName].push(value.RestaurantID);
//         } else {
//           let restIDsList = [];
//           restIDsList.push(value.RestaurantID);
//           tempObject[value.FoodName] = restIDsList;
//         }
//       });

//       Object.keys(tempObject).forEach((keyVal) => {
//         listOfTypeahead.push({
//           name: keyVal,
//           id: tempObject[keyVal],
//           isRestaurant: false,
//         });
//       });

//       res.send(listOfTypeahead);
//     }
//   });
// };

module.exports = getTypeaheadList;
