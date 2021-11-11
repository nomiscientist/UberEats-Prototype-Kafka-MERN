const CustomerDetailsModel = require("../../Models/CustomerDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (registrationDetails, callback) => {
  const CustomerDetail = new CustomerDetailsModel(registrationDetails);

  try {
    let customerDetail = await CustomerDetails.findOne({
      emailId: registrationDetails.emailId,
    });

    if (customerDetail) {
      callback({ error: "existing email id used!!" }, null);
    } else {
      CustomerDetail.save();

      callback(null, {
        customerId: CustomerDetail._id,
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
