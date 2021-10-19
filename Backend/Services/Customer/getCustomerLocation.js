const CustomerDetails = require("../../Models/CustomerDetailsModel");

const getCustomerLocation = (req, res) => {
  try {
    CustomerDetails.findOne(
      { _id: req.body.customerId },
      (error, customerDetail) => {
        if (error) {
          throw error;
        }

        if (customerDetail) {
          res.status(200).send({
            city: customerDetail.city.length > 0 ? customerDetail.city : "",
          });
        }
      }
    );
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = getCustomerLocation;
