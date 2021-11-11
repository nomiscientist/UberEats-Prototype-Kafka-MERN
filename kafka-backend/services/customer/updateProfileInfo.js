const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (profileDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: profileDetails.customerId,
    });

    if (customerDetail) {
      CustomerDetails.updateOne(
        customerDetail,
        {
          firstName: profileDetails.firstName,
          emailId: profileDetails.emailId,
          lastName: profileDetails.lastName,
          city: profileDetails.city,
          state: profileDetails.state,
          zipCode: profileDetails.zipCode,
          country: profileDetails.country,
          contactNumber: profileDetails.contactNumber,
          address1: profileDetails.address1,
          address2: profileDetails.address2,
          nickname: profileDetails.nickname,
          dateOfBirth: profileDetails.dateOfBirth,
          about: profileDetails.about,
          image: profileDetails.file?.filename,
        },
        (error, customerDetail) => {
          if (error) {
            throw error;
          }

          if (customerDetail) {
            console.log("Update successful!!");

            callback(null, { responseFlag: "Success" });
          }
        }
      );
    } else throw error;
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
