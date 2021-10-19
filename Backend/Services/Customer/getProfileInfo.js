const multer = require("multer");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const getProfileInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  CustomerDetails.findOne(
    { _id: req.query.customerId },
    (error, customerDetail) => {
      if (error) {
        throw error;
      }

      if (customerDetail) {
        res.send(customerDetail);
      }
    }
  );
};
module.exports = getProfileInfo;
