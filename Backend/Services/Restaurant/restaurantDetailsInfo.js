const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const multer = require("multer");

const restaurantDetailsInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  try {
    RestaurantDetails.findOne(
      { _id: req.query.restaurantId },
      (error, restaurantDetail) => {
        if (error) {
          throw error;
        }

        if (restaurantDetail) {
          res.send({
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
        }
      }
    );
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = restaurantDetailsInfo;
