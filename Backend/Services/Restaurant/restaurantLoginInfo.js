const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../../Controller/Common/config");
const { auth } = require("../../Controller/Common/passport");
auth();

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
          const payload = {
            restaurantId: restaurantDetail._id,
            restaurantFlag: true,
          };

          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          // console.log("token", token);
          res.status(200).send({ token: "JWT " + token });
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
