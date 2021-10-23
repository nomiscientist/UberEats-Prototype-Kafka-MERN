const CustomerDetails = require("../../Models/CustomerDetailsModel");

const showCustomerProfile = async (req, res) => {
  try {
    let customer = await CustomerDetails.findOne({
      _id: req.body.customerId,
    }).exec();

    if (customer) {
      res.status(200).send(customer);
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = showCustomerProfile;
