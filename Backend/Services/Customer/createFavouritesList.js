//const con = require("../../Controller/Common/dbConnection");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const createFavouritesList = async (req, res) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: req.body.customerId,
    }).exec();

    if (customerDetail) {
      console.log("CustomerDetail", customerDetail);

      let result = customerDetail.favoriteRestaurant.find(
        (id) => id === req.body.restaurantId
      );
      console.log("result", result);

      if (result) {
        console.log("Am I here");
        let newArray = await customerDetail.favoriteRestaurant.filter(function (
          element
        ) {
          return element !== req.body.restaurantId;
        });

        CustomerDetails.updateOne(customerDetail, {
          favoriteRestaurant: newArray,
        }).exec();
      } else {
        console.log(
          "I should be here",
          req.body.restaurantId,
          customerDetail.favoriteRestaurant
        );
        let newArray = customerDetail.favoriteRestaurant;
        newArray.push(req.body.restaurantId);

        console.log("newArray", newArray);

        CustomerDetails.findOne(
          { _id: req.body.customerId },
          (error, customerDetail) => {
            if (error) {
              throw error;
            }

            if (customerDetail) {
              CustomerDetails.updateOne(customerDetail, {
                favoriteRestaurant: newArray,
              }).exec();
            }
          }
        );
      }
      res.send({ Message: "Favorite List Updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = createFavouritesList;
