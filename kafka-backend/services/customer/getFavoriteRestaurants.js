const CustomerDetails = require("../../Models/CustomerDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (customerDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: customerDetails.customerId,
    }).exec();

    if (customerDetail) {
      let restIds = customerDetail.favoriteRestaurant;

      const restaurantDetail = await RestaurantDetails.find({
        _id: { $in: restIds },
      }).exec();

      let result = JSON.parse(JSON.stringify(restaurantDetail));
      callback(null, result);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
