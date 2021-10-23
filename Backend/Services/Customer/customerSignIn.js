// const CustomerDetailsModel = require("../../Models/CustomerDetailsModel");
// const { collection } = require("../../Models/CustomerDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");
const jwt = require("jsonwebtoken");
const { secret } = require("../../Controller/Common/config");
const { auth } = require("../../Controller/Common/passport");
auth();

const customerSignIn = (req, res) => {
  try {
    CustomerDetails.findOne(
      { emailId: req.body.emailId, password: req.body.password },
      (error, customerDetail) => {
        if (error) {
          throw error;
        }

        if (customerDetail) {
          console.log("Login successful!!", customerDetail);
          const payload = {
            customerID: customerDetail._id,
            restaurantFlag: false,
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          console.log("token", token);
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

module.exports = customerSignIn;
