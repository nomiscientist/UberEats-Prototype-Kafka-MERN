// const con = require("../../Controller/Common/dbConnection");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const showCartDetails = async (req, res) => {
  let order = await Orders.findOne({
    customerId: req.body.customerId,
    finalStatus: "New",
  }).exec();

  // console.log("order", order.restaurantId);
  if (order) {
    let orderDetail = await OrderDetails.find({
      customerId: req.body.customerId,
      orderId: order._id,
    }).exec();

    // console.log("orderDetail", orderDetail);

    let restaurant = await RestaurantDetails.find({
      _id: order.restaurantId,
    }).exec();

    console.log("restaurant", restaurant);
    let result = orderDetail.map((element) => {
      return {
        ...element._doc,
        restaurantName: restaurant[0].restaurantName,
      };
    });
    console.log("result", result);
    result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  } else {
    res.status(200).send([]);
  }
};

module.exports = showCartDetails;
