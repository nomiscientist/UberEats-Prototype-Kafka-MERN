// const RestaurantDetailsModel = require("../../Models/RestaurantDetailsModel");
// const { collection } = require("../../Models/RestaurantDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const restaurantLoginInfo = (req, res) => {
  try {
    RestaurantDetails.findOne(
      { emailId: req.body.emailId, password: req.body.password },
      (error, restaurantDetail) => {
        if (error) {
          throw error;
        }

        if (restaurantDetail) {
          console.log("Login successful!!", restaurantDetail);

          res.send({
            restaurantId: restaurantDetail._id,
          });
        } else {
          res
            .status(401)
            .send({ error: "Incorrect Email ID or Password Login!" });
        }
      }
    );
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = restaurantLoginInfo;
