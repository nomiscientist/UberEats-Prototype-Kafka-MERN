const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (customerDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: customerDetails.customerId,
    });

    if (customerDetail) {
      let customerCity =
        customerDetail.city.length > 0 ? customerDetail.city : "";
      callback(null, {
        city: customerCity,
      });
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
