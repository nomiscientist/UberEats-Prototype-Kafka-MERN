const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (profile, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: profile.customerId,
    });

    if (customerDetail) {
      callback(null, customerDetail);
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};
exports.handle_request = handle_request;
