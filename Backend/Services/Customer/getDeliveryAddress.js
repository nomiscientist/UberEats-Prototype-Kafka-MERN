const con = require("../../Controller/Common/dbConnection");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const getDeliveryAddress = (req, res) => {
  CustomerDetails.findOne(
    { _id: req.query.customerId },
    (error, customerDetail) => {
      if (error) {
        throw error;
      }

      if (customerDetail) {
        res.status(200).send({
          addressLine1: customerDetail.addressLine1,
          addressLine2: customerDetail.addressLine2,
          city: customerDetail.City,
        });
      }
    }
  );
};

module.exports = getDeliveryAddress;
