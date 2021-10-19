const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const con = require("./Controller/Common/dbConnection");
const restaurantSignUpInfo = require("./Services/Restaurant/restaurantSignUpInfo");
const restaurantLoginInfo = require("./Services/Restaurant/restaurantLoginInfo");
const restaurantDetailsInfo = require("./Services/Restaurant/restaurantDetailsInfo");
const restaurantDetailsInfoUpdate = require("./Services/Restaurant/restaurantDetailsInfoUpdate");
const getTypeaheadList = require("./Services/Restaurant/getTypeaheadList");
const getListOfRestaurants = require("./Services/Restaurant/getListOfRestaurants");
const customerSignUpInfo = require("./Services/Customer/customerSignUpInfo");
const updateProfileInfo = require("./Services/Customer/updateProfileInfo");
const getProfileInfo = require("./Services/Customer/getProfileInfo");
const addFoodDishes = require("./Services/Restaurant/addFoodDishes");
const editFoodDishes = require("./Services/Restaurant/editFoodDishes");
const foodItemsDisplay = require("./Services/Restaurant/foodItemsDisplay");
const createFavouritesList = require("./Services/Customer/createFavouritesList");
const customerSignIn = require("./Services/Customer/customerSignIn");
const addOrdertoCart = require("./Services/Restaurant/addOrdertoCart");
const showCartDetails = require("./Services/Customer/showCartDetails");
const updateCartOrderDetails = require("./Services/Customer/updateCartOrderDetails");
const postToCart = require("./Services/Customer/postToCart");
const getOrderTotal = require("./Services/Customer/getOrderTotal");
const getFavoriteRestaurants = require("./Services/Customer/getFavoriteRestaurants");
const bookOrder = require("./Services/Customer/bookOrder");
const getDeliveryAddress = require("./Services/Customer/getDeliveryAddress");
const addDeliveryAddress = require("./Services/Customer/addDeliveryAddress");
const getPastOrders = require("./Services/Customer/getPastOrders");
const getReceiptDetails = require("./Services/Customer/getReceiptDetails");
const showCustomerProfile = require("./Services/Restaurant/showCustomerProfile");
const getRestaurantOrders = require("./Services/Restaurant/getRestaurantOrders");
const showRestaurantOrderDetails = require("./Services/Restaurant/showRestaurantOrderDetails");
const updateOrderStatus = require("./Services/Restaurant/updateOrderStatus");
const getCustomerLocation = require("./Services/Customer/getCustomerLocation");
const getDeliveryType = require("./Services/Customer/getDeliveryType");
const createNewOrder = require("./Services/Customer/createNewOrder");

//---------------------------MongoDB--------
const { mongoDB } = require("./Controller/Common/config");
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 500,
  wtimeoutMS: 2500,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log("MongoDB connection failed");
  } else {
    console.log("MongoDB connected!!");
  }
});

//---------------------------MongoDB--------

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    console.log("File name : ", file);
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.post("/restaurantLoginInfo", restaurantLoginInfo);

app.post("/customerSignIn", customerSignIn);

app.post("/restaurantSignUpInfo", restaurantSignUpInfo);
app.post("/customerSignUpInfo", customerSignUpInfo);

app.post("/addFoodItems", upload.single("file"), addFoodDishes);
app.post("/editFoodItems", upload.single("file"), editFoodDishes);

app.get("/foodItemsDisplay", upload.single("file"), foodItemsDisplay);

app.get("/restaurantDetailsInfo", upload.single("file"), restaurantDetailsInfo);

app.post(
  "/restaurantDetailsInfoUpdate",
  upload.single("file"),
  restaurantDetailsInfoUpdate
);
app.get("/getProfileInfo", upload.single("file"), getProfileInfo);

app.post("/updateProfileInfo", upload.single("file"), updateProfileInfo);

app.post("/getListOfRestaurants", getListOfRestaurants);
app.post("/getFavoriteRestaurants", getFavoriteRestaurants);

app.post("/getTypeaheadList", getTypeaheadList);

app.post("/createFavouritesList", createFavouritesList);

app.post("/addOrdertoCart", addOrdertoCart);

app.post("/showCartDetails", showCartDetails);

app.post("/updateCartOrderDetails", updateCartOrderDetails);

app.post("/postToCart", postToCart);

app.get("/getOrderTotal", getOrderTotal);

app.post("/bookOrder", bookOrder);
app.post("/addDeliveryAddress", addDeliveryAddress);

app.get("/getDeliveryAddress", getDeliveryAddress);

app.post("/getPastOrders", getPastOrders);

app.post("/getReceiptDetails", getReceiptDetails);

app.post("/showCustomerProfile", showCustomerProfile);

app.post("/getRestaurantOrders", getRestaurantOrders);

app.post("/showRestaurantOrderDetails", showRestaurantOrderDetails);

app.post("/getCustomerLocation", getCustomerLocation);

app.get("/getDeliveryType", getDeliveryType);

app.post("/updateOrderStatus", updateOrderStatus);

app.post("/createNewOrder", createNewOrder);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
