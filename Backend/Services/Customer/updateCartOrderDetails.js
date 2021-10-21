// const con = require("../../Controller/Common/dbConnection");
const OrderDetails = require("../../Models/OrderDetailsModel");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");

const updateCartOrderDetails = async (req, res) => {
  try {
    if (req.body.quantity === 0) {
      await OrderDetails.findOneAndDelete({
        _id: req.body._id,
      }).exec();

      return res.status(200).send([]);
    } else {
      console.log("here?");
      let orderDetail = await OrderDetails.findOne({
        _id: req.body._id,
      }).exec();

      console.log("orderDetail?", orderDetail);

      if (orderDetail) {
        OrderDetails.updateOne(orderDetail, {
          quantity: req.body.quantity,
          amount: req.body.quantity * req.body.price,
        }).exec();
      }
    }

    let restaurant = await RestaurantDetails.findOne({
      _id: req.body.restaurantId,
    }).exec();

    console.log("restaurant?", restaurant);

    let orderDetail = await OrderDetails.find({
      customerId: req.body.customerId,
      orderId: req.body.orderId,
    }).exec();

    let result = orderDetail.map((element) => {
      return {
        ...element._doc,
        restaurantName: restaurant.restaurantName,
      };
    });
    console.log("result", result);
    result = JSON.parse(JSON.stringify(result));
    res.status(200).send(result);
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = updateCartOrderDetails;
