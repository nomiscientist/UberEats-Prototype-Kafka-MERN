const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const handle_request = async (registrationDetails, callback) => {
  const RestaurantDetail = new RestaurantDetailsModel(registrationDetails);

  try {
    let restaurantDetail = await RestaurantDetails.findOne({
      emailId: registrationDetails.emailId,
    });

    if (restaurantDetail) {
      console.log("existing email id used!!");
      // res.status(409).send({ error: "existing email id used!!" });
      callback({ error: "existing email id used!!" }, null);
    } else {
      RestaurantDetail.save();
      // res.send({
      //   restaurantId: RestaurantDetail._id,
      // });
      callback(null, {
        restaurantId: RestaurantDetail._id,
      });
    }
  } catch (exception) {
    // res.sendStatus(500);
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
