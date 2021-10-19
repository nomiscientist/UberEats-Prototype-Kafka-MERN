const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
// const { collection } = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const restaurantSignUpInfo = (req, res) => {
  const RestaurantDetail = new RestaurantDetailsModel(req.body);

  try {
    RestaurantDetails.findOne(
      { emailId: req.body.emailId },
      (error, restaurantDetail) => {
        if (error) {
          console.log("error", error);
          throw error;
        }

        if (restaurantDetail) {
          console.log("existing email id used!!");
          res.status(409).send({ error: "existing email id used!!" });
        } else {
          RestaurantDetail.save();
          res.send({
            restaurantId: RestaurantDetail._id,
          });
        }
      }
    );
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = restaurantSignUpInfo;
