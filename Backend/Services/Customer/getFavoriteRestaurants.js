const CustomerDetails = require("../../Models/CustomerDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const getFavoriteRestaurants = async (req, res) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: req.body.customerId,
    }).exec();

    if (customerDetail) {
      let restIds = customerDetail.favoriteRestaurant;

      const restaurantDetail = await RestaurantDetails.find({
        _id: { $in: restIds },
      }).exec();
      console.log("getFavRest", restaurantDetail);
      let result = JSON.parse(JSON.stringify(restaurantDetail));
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getFavoriteRestaurants;
