const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../../kafka/config");
// const { auth } = require("../../../Backend/Controller/Common/passport");
// auth();

// const restaurantLoginInfo = async (req, res) => {
const handle_request = async (restaurantRegistrationDetails, callback) => {
  try {
    let restaurantDetail = await RestaurantDetails.findOne({
      emailId: restaurantRegistrationDetails.emailId,
      password: restaurantRegistrationDetails.password,
    });

    if (restaurantDetail) {
      console.log("Login successful!!", restaurantDetail);
      const payload = {
        restaurantId: restaurantDetail._id,
        restaurantFlag: true,
      };

      const token = jwt.sign(payload, secret, {
        expiresIn: 1008000,
      });
      // console.log("token", token);
      // res.status(200).send({ token: "JWT " + token });
      callback(null, { token: `JWT ${token}` });
    } else {
      // res.status(401).send({ error: "Incorrect Email ID or Password Login!" });
      callback({ message: "Incorrect Email ID or Password Login!" }, null);
    }
  } catch (exception) {
    // res.sendStatus(500);
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
