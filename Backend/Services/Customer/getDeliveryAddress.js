const CustomerDetails = require("../../Models/CustomerDetailsModel");

const getDeliveryAddress = async (req, res) => {
  try {
    let customer = await CustomerDetails.findOne({
      _id: req.query.customerId,
    }).exec();

    if (customer) {
      res.status(200).send({
        addressLine1: customer.address1,
        addressLine2: customer.address2,
        city: customer.city,
      });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getDeliveryAddress;
