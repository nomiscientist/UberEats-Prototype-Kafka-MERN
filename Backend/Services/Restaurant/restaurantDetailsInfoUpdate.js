const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const multer = require("multer");

const restaurantDetailsInfoUpdate = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  try {
    RestaurantDetails.findOne(
      { _id: req.body.restaurantId },
      (error, restaurantDetail) => {
        if (error) {
          throw error;
        }

        if (restaurantDetail) {
          RestaurantDetails.updateOne(
            restaurantDetail,
            {
              emailId: req.body.emailId,
              restaurantName: req.body.restaurantName,
              address: req.body.address,
              openTime: req.body.openTime,
              closeTime: req.body.closeTime,
              deliveryFlag: req.body.deliveryFlag,
              pickupFlag: req.body.pickupFlag,
              about: req.body.about,
              image: req.file?.filename,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode,
              country: req.body.country,
              contactNumber: req.body.contactNumber,
            },
            (error, customerDetail) => {
              if (error) {
                throw error;
              }

              if (customerDetail) {
                console.log("Update successful!!");

                res.send({
                  responseFlag: "Success",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = restaurantDetailsInfoUpdate;
