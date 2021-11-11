const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (customerDetails, callback) => {
  try {
    let customer = await CustomerDetails.findOne({
      _id: customerDetails.customerId,
    }).exec();

    if (customer) {
      callback(null, customer);
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
