const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const multer = require("multer");

const handle_request = async (restaurantDetails, callback) => {
  try {
    let restaurantDetail = await RestaurantDetails.findOne({
      _id: restaurantDetails.restaurantId,
    });

    if (restaurantDetail) {
      callback(null, {
        restaurantId: restaurantDetail._id,
        restaurantName: restaurantDetail.restaurantName,
        address: restaurantDetail.address,
        about: restaurantDetail.about,
        city: restaurantDetail.city,
        state: restaurantDetail.state,
        zipCode: restaurantDetail.zipCode,
        country: restaurantDetail.country,
        contactNumber: restaurantDetail.contactNumber,
        emailId: restaurantDetail.emailId,
        image: restaurantDetail.image,
        openTime: restaurantDetail.openTime,
        closeTime: restaurantDetail.closeTime,
        deliveryFlag: restaurantDetail.deliveryFlag,
        pickupFlag: restaurantDetail.pickupFlag,
      });
    } else {
      throw error;
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
