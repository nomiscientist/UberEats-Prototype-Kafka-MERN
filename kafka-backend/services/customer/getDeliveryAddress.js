const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (deliveryAddress, callback) => {
  try {
    let customer = await CustomerDetails.findOne({
      _id: deliveryAddress.customerId,
    }).exec();

    if (customer) {
      callback(null, {
        addressLine1: customer.address1,
        addressLine2: customer.address2,
        city: customer.city,
      });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
