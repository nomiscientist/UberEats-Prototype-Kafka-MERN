// const con = require("../../Controller/Common/dbConnection");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

const multer = require("multer");

const updateProfileInfo = (req, res, err) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json(err);
  }

  try {
    CustomerDetails.findOne(
      { _id: req.body.customerId },
      (error, customerDetail) => {
        if (error) {
          throw error;
        }

        if (customerDetail) {
          CustomerDetails.updateOne(
            customerDetail,
            {
              firstName: req.body.firstName,
              emailId: req.body.emailId,
              lastName: req.body.lastName,
              city: req.body.city,
              state: req.body.state,
              zipCode: req.body.zipCode,
              country: req.body.country,
              contactNumber: req.body.contactNumber,
              address1: req.body.address1,
              address2: req.body.address2,
              nickname: req.body.nickname,
              dateOfBirth: req.body.dateOfBirth,
              about: req.body.about,
              image: req.file?.filename,
            },
            (error, customerDetail) => {
              if (error) {
                throw error;
              }

              if (customerDetail) {
                console.log("Update successful!!");

                res.send({
                  responseFlag: "Success",
                });
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateProfileInfo;
