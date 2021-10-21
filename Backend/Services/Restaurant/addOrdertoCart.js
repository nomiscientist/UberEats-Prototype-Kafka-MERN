const CustomerDetails = require("../../Models/CustomerDetailsModel");
const Orders = require("../../Models/OrdersModel");
const OrderDetails = require("../../Models/OrderDetailsModel");

const addOrdertoCart = async (req, res) => {
  let mainOrderId;

  if (req.body.quantity === 0) {
    res.send({ Message: "No Dish added as quantity is 0" });
    return;
  }

  if (!req.body.quantity) {
    res.send({ Message: "No Dish added as quantity is 0" });
    return;
  }

  try {
    let order = await Orders.findOne({
      customerId: req.body.customerId,
      finalStatus: "New",
    }).exec();

    if (order) {
      mainOrderId = order._id;

      let orderDetail = await new OrderDetails({
        orderId: mainOrderId,
        foodId: req.body.foodId,
        restaurantId: req.body.restaurantId,
        customerId: req.body.customerId,
        dishName: req.body.foodName,
        price: req.body.dishPrice,
        quantity: req.body.quantity,
        amount: req.body.dishPrice * req.body.quantity,
      });
      orderDetail.save();

      res.send({ Message: "Added to cart", orderId: mainOrderId });
    } else {
      let order = await new Orders({
        restaurantId: req.body.restaurantId,
        customerId: req.body.customerId,
        finalStatus: "New",
        deliveryOrPickup: req.body.deliveryType,
      });

      order.save();

      mainOrderId = order._id;

      let orderDetail = await new OrderDetails({
        orderId: mainOrderId,
        foodId: req.body.foodId,
        restaurantId: req.body.restaurantId,
        customerId: req.body.customerId,
        dishName: req.body.foodName,
        price: req.body.dishPrice,
        quantity: req.body.quantity,
        amount: req.body.dishPrice * req.body.quantity,
      });
      orderDetail.save();

      res.send({ Message: "Added to cart", orderId: mainOrderId });
    }
  } catch (exception) {
    res.sendStatus(500);
  }
};

module.exports = addOrdertoCart;
