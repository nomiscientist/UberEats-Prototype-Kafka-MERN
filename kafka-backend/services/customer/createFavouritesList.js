const CustomerDetails = require("../../Models/CustomerDetailsModel");

const handle_request = async (customerDetails, callback) => {
  try {
    let customerDetail = await CustomerDetails.findOne({
      _id: customerDetails.customerId,
    }).exec();

    if (customerDetail) {
      let result = customerDetail.favoriteRestaurant.find(
        (id) => id === customerDetails.restaurantId
      );

      if (result) {
        let newArray = await customerDetail.favoriteRestaurant.filter(function (
          element
        ) {
          return element !== customerDetails.restaurantId;
        });

        CustomerDetails.updateOne(customerDetail, {
          favoriteRestaurant: newArray,
        }).exec();
      } else {
        let newArray = customerDetail.favoriteRestaurant;
        newArray.push(customerDetails.restaurantId);

        CustomerDetails.findOne(
          { _id: customerDetails.customerId },
          (error, customerDetail) => {
            if (error) {
              throw error;
            }

            if (customerDetail) {
              CustomerDetails.updateOne(customerDetail, {
                favoriteRestaurant: newArray,
              }).exec();
            }
          }
        );
      }
      callback(null, { Message: "Favorite List Updated" });
    }
  } catch (exception) {
    callback({ message: exception }, null);
  }
};

exports.handle_request = handle_request;
