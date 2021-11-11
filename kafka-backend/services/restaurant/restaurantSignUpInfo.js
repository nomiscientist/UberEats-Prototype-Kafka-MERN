const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (registrationDetails, callback) => {
  const RestaurantDetail = new RestaurantDetailsModel(registrationDetails);

  try {
    let restaurantDetail = await RestaurantDetails.findOne({
      emailId: registrationDetails.emailId,
    });

    if (restaurantDetail) {
      callback({ error: "existing email id used!!" }, null);
    } else {
      RestaurantDetail.save();

      callback(null, {
        restaurantId: RestaurantDetail._id,
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
