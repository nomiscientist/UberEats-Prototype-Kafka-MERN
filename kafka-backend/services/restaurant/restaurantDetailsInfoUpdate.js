const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const multer = require("multer");

const handle_request = async (restaurantDetails, callback) => {
  try {
    const filter = { _id: restaurantDetails.restaurantId };
    const update = {
      emailId: restaurantDetails.emailId,
      restaurantName: restaurantDetails.restaurantName,
      address: restaurantDetails.address,
      openTime: restaurantDetails.openTime,
      closeTime: restaurantDetails.closeTime,
      deliveryFlag: restaurantDetails.deliveryFlag,
      pickupFlag: restaurantDetails.pickupFlag,
      about: restaurantDetails.about,
      image: restaurantDetails.file?.filename,
      city: restaurantDetails.city,
      state: restaurantDetails.state,
      zipCode: restaurantDetails.zipCode,
      country: restaurantDetails.country,
      contactNumber: restaurantDetails.contactNumber,
    };

    let restaurantDetail = await RestaurantDetails.findOneAndUpdate(
      filter,
      update,
      {
        new: true,
      }
    );

    if (restaurantDetail) {
      console.log("Update successful!!");
      callback(null, { responseFlag: "Success" });
    } else {
      throw error;
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
