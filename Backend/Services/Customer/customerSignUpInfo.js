const CustomerDetailsModel = require("../../Models/CustomerDetailsModel");
// const { collection } = require("../../Models/CustomerDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

//API to get the details of the customer from the sign up page, only mandatory fields updated
const customerSignUpInfo = (req, res) => {
  const CustomerDetail = new CustomerDetailsModel(req.body);

  try {
    CustomerDetails.findOne(
      { emailId: req.body.emailId },
      (error, customerDetail) => {
        if (error) {
          console.log("error", error);
          throw error;
        }

        if (customerDetail) {
          console.log("existing email id used!!");
          res.status(409).send({ error: "existing email id used!!" });
        } else {
          CustomerDetail.save();
          res.send({
            customerId: CustomerDetail._id,
          });
        }
      }
    );
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = customerSignUpInfo;
