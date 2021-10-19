// const CustomerDetailsModel = require("../../Models/CustomerDetailsModel");
// const { collection } = require("../../Models/CustomerDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

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

          res.send({
            restaurantFlag: false,
            customerID: customerDetail._id,
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

module.exports = customerSignIn;
