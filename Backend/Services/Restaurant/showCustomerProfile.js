const CustomerDetails = require("../../Models/CustomerDetailsModel");

const showCustomerProfile = (req, res) => {
  CustomerDetails.findOne(
    { _id: req.body.customerId },
    (error, customerDetail) => {
      if (error) {
        throw error;
      }

      if (customerDetail) {
        res.status(200).send(customerDetail);
      }
    }
  );
};

module.exports = showCustomerProfile;
