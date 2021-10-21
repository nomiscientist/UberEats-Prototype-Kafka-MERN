const express = require("express");
const cors = require("cors");
const multer = require("multer");
// const Router = require("./routes");
const path = require("path");
// const con = require("./Controller/Common/dbConnection");
// const CustomerDetailsModel = require("./Models/CustomerDetailsModel");

const { mongoDB } = require("./Controller/Common/config");
const mongoose = require("mongoose");
// const { collection } = require("./Models/CustomerDetailsModel");
// const CustomerDetails = require("./Models/CustomerDetailsModel");
const customerSignIn = require("./Services/Customer/customerSignIn");
const customerSignUpInfo = require("./Services/Customer/customerSignUpInfo");
const restaurantSignUpInfo = require("./Services/Restaurant/restaurantSignUpInfo");
const restaurantLoginInfo = require("./Services/Restaurant/restaurantLoginInfo");
const getProfileInfo = require("./Services/Customer/getProfileInfo");
const getCustomerLocation = require("./Services/Customer/getCustomerLocation");
const updateProfileInfo = require("./Services/Customer/updateProfileInfo");
const restaurantDetailsInfo = require("./Services/Restaurant/restaurantDetailsInfo");
const restaurantDetailsInfoUpdate = require("./Services/Restaurant/restaurantDetailsInfoUpdate");
const addFoodDishes = require("./Services/Restaurant/addFoodDishes");
const foodItemsDisplay = require("./Services/Restaurant/foodItemsDisplay");
const editFoodDishes = require("./Services/Restaurant/editFoodDishes");
const showCustomerProfile = require("./Services/Restaurant/showCustomerProfile");
const getTypeaheadList = require("./Services/Restaurant/getTypeaheadList");
const getDeliveryAddress = require("./Services/Customer/getDeliveryAddress");
const getListOfRestaurants = require("./Services/Restaurant/getListOfRestaurants");
const createFavouritesList = require("./Services/Customer/createFavouritesList");
const getFavoriteRestaurants = require("./Services/Customer/getFavoriteRestaurants");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/customerSignIn", customerSignIn);

app.post("/customerSignUpInfo", customerSignUpInfo);

app.post("/restaurantLoginInfo", restaurantLoginInfo);

app.post("/restaurantSignUpInfo", restaurantSignUpInfo);

app.get("/getProfileInfo", upload.single("file"), getProfileInfo);

app.post("/getCustomerLocation", getCustomerLocation);

app.post("/updateProfileInfo", upload.single("file"), updateProfileInfo);

app.get("/restaurantDetailsInfo", upload.single("file"), restaurantDetailsInfo);

app.post(
  "/restaurantDetailsInfoUpdate",
  upload.single("file"),
  restaurantDetailsInfoUpdate
);

app.post("/addFoodItems", upload.single("file"), addFoodDishes);

app.get("/foodItemsDisplay", upload.single("file"), foodItemsDisplay);

app.post("/editFoodItems", upload.single("file"), editFoodDishes);

app.post("/showCustomerProfile", showCustomerProfile);

app.post("/getTypeaheadList", getTypeaheadList);

app.get("/getDeliveryAddress", getDeliveryAddress);

app.post("/getListOfRestaurants", getListOfRestaurants);
app.post("/createFavouritesList", createFavouritesList);
app.post("/getFavoriteRestaurants", getFavoriteRestaurants);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
