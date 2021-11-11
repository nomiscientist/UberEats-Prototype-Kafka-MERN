const CustomerDetailsModel = require("../../Models/CustomerDetailsModel");
// const { collection } = require("../../Models/CustomerDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

//API to get the details of the customer from the sign up page, only mandatory fields updated
// const customerSignUpInfo = (req, res) => {

const handle_request = async (registrationDetails, callback) => {
  const CustomerDetail = new CustomerDetailsModel(registrationDetails);

  try {
    let customerDetail = await CustomerDetails.findOne({
      emailId: registrationDetails.emailId,
    });

    if (customerDetail) {
      console.log("existing email id used!!");
      //res.status(409).send({ error: "existing email id used!!" });
      callback({ error: "existing email id used!!" }, null);
    } else {
      CustomerDetail.save();

      callback(null, {
        customerId: CustomerDetail._id,
      });
    }
  } catch (exception) {
    // res.sendStatus(500);
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
