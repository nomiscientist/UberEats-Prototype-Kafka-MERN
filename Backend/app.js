const express = require("express");
const cors = require("cors");
const multer = require("multer");
const kafka = require("./kafka/client");

// const Router = require("./routes");
const path = require("path");
var bodyParser = require("body-parser");
// const con = require("./Controller/Common/dbConnection");
// const CustomerDetailsModel = require("./Models/CustomerDetailsModel");

// const { mongoDB } = require("./Controller/Common/config");
// const mongoose = require("mongoose");
// const { collection } = require("./Models/CustomerDetailsModel");//
// const CustomerDetails = require("./Models/CustomerDetailsModel");
// const customerSignIn = require("./Services/Customer/customerSignIn");
// const customerSignUpInfo = require("./Services/Customer/customerSignUpInfo");
// const restaurantSignUpInfo = require("./Services/Restaurant/restaurantSignUpInfo");
// const restaurantLoginInfo = require("./Services/Restaurant/restaurantLoginInfo");
// const getProfileInfo = require("./Services/Customer/getProfileInfo");
// const getCustomerLocation = require("./Services/Customer/getCustomerLocation");
// const updateProfileInfo = require("./Services/Customer/updateProfileInfo");
// const restaurantDetailsInfo = require("./Services/Restaurant/restaurantDetailsInfo");
// const restaurantDetailsInfoUpdate = require("./Services/Restaurant/restaurantDetailsInfoUpdate");
// const addFoodDishes = require("./Services/Restaurant/addFoodDishes");
// const foodItemsDisplay = require("./Services/Restaurant/foodItemsDisplay");
// const editFoodDishes = require("./Services/Restaurant/editFoodDishes");
// const showCustomerProfile = require("./Services/Restaurant/showCustomerProfile");
// const getTypeaheadList = require("./Services/Restaurant/getTypeaheadList");
// const getDeliveryAddress = require("./Services/Customer/getDeliveryAddress");
// const getListOfRestaurants = require("./Services/Restaurant/getListOfRestaurants");
// const createFavouritesList = require("./Services/Customer/createFavouritesList");
// const getFavoriteRestaurants = require("./Services/Customer/getFavoriteRestaurants");
// const addOrdertoCart = require("./Services/Restaurant/addOrdertoCart");
// const showCartDetails = require("./Services/Customer/showCartDetails");
// const updateCartOrderDetails = require("./Services/Customer/updateCartOrderDetails");
// const getOrderTotal = require("./Services/Customer/getOrderTotal");
// const getDeliveryType = require("./Services/Customer/getDeliveryType");
// const addDeliveryAddress = require("./Services/Customer/addDeliveryAddress");
// const bookOrder = require("./Services/Customer/bookOrder");
// const updateOrderStatus = require("./Services/Restaurant/updateOrderStatus");
// const getRestaurantOrders = require("./Services/Restaurant/getRestaurantOrders");
// const showRestaurantOrderDetails = require("./Services/Restaurant/showRestaurantOrderDetails");
// const getPastOrders = require("./Services/Customer/getPastOrders");
// const getReceiptDetails = require("./Services/Customer/getReceiptDetails");
// const createNewOrder = require("./Services/Customer/createNewOrder");
const passport = require("passport");
const { checkAuth } = require("./Controller/Common/passport");
const { auth } = require("./Controller/Common/passport");

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// var options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   maxPoolSize: 500,
//   wtimeoutMS: 2500,
// };

// mongoose.connect(mongoDB, options, (err, res) => {
//   if (err) {
//     console.log(err);
//     console.log("MongoDB connection failed");
//   } else {
//     console.log("MongoDB connected!!");
//   }
// });

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
auth();
var upload = multer({ storage: storage });

app.post("/customerSignIn", function (req, res) {
  kafka.make_request("signInCustomer", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/customerSignUpInfo", function (req, res) {
  kafka.make_request("registerCustomer", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/restaurantLoginInfo", function (req, res) {
  kafka.make_request("signInRestaurant", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/restaurantSignUpInfo", function (req, res) {
  kafka.make_request("registerRestaurant", req.body, function (err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

// app.get("/getProfileInfo", checkAuth, upload.single("file"), getProfileInfo);

app.post("/getCustomerLocation", function (req, res) {
  kafka.make_request("customerLocation", req.body, function (err, results) {
    console.log("in result");
    checkAuth;
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

// app.post(
//   "/updateProfileInfo",
//   checkAuth,
//   upload.single("file"),
//   updateProfileInfo
// );

app.get(
  "/restaurantDetailsInfo",
  // checkAuth,
  // upload.single("file"),
  function (req, res) {
    kafka.make_request("restaurantDetails", req.query, function (err, results) {
      console.log("in result");
      checkAuth;
      upload.single("file");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        res.status(200).json(results);
        res.end();
      }
    });
  }
);

app.post(
  "/restaurantDetailsInfoUpdate",
  // checkAuth,
  upload.single("file"),
  function (req, res) {
    console.log("req.body", req.body);
    kafka.make_request(
      "restaurantDetailsUpdate",
      req.body,
      function (err, results) {
        console.log("in result");
        checkAuth;
        upload.single("file");
        console.log(results);
        if (err) {
          console.log("Inside err");
          res.json({
            status: "error",
            msg: "System Error, Try Again.",
          });
        } else {
          console.log("Inside else");
          res.status(200).json(results);
          res.end();
        }
      }
    );
  }
);

app.post("/addFoodItems", upload.single("file"), function (req, res) {
  console.log("req.body", req.body);
  kafka.make_request("addDish", req.body, function (err, results) {
    console.log("in result");
    checkAuth;
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.get(
  "/foodItemsDisplay",
  // checkAuth,
  upload.single("file"),
  function (req, res) {
    kafka.make_request("foodDetails", req.query, function (err, results) {
      console.log("in result");
      checkAuth;
      // upload.single("file");
      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        res.status(200).json(results);
        res.end();
      }
    });
  }
);

app.post("/editFoodItems", upload.single("file"), function (req, res) {
  kafka.make_request("editDish", req.body, function (err, results) {
    console.log("in result");
    checkAuth;

    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/showCustomerProfile", function (req, res) {
  kafka.make_request("showCustomerProfile", req.body, function (err, results) {
    console.log("in result");
    checkAuth;

    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});
// app.post("/getTypeaheadList", checkAuth, getTypeaheadList);

// app.get("/getDeliveryAddress", checkAuth, getDeliveryAddress);

// app.post("/getListOfRestaurants", checkAuth, getListOfRestaurants);
// app.post("/createFavouritesList", checkAuth, createFavouritesList);
// app.post("/getFavoriteRestaurants", checkAuth, getFavoriteRestaurants);

// app.post("/addOrdertoCart", checkAuth, addOrdertoCart);

// app.post("/showCartDetails", checkAuth, showCartDetails);
// app.post("/updateCartOrderDetails", checkAuth, updateCartOrderDetails);

// app.get("/getOrderTotal", checkAuth, getOrderTotal);

// app.get("/getDeliveryType", checkAuth, getDeliveryType);

// app.post("/addDeliveryAddress", checkAuth, addDeliveryAddress);

// app.post("/bookOrder", checkAuth, bookOrder);

app.post("/updateOrderStatus", function (req, res) {
  kafka.make_request("orderStatusUpdate", req.body, function (err, results) {
    console.log("in result");
    checkAuth;

    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/getRestaurantOrders", function (req, res) {
  kafka.make_request("restaurantOrders", req.body, function (err, results) {
    console.log("in result");
    checkAuth;

    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

app.post("/showRestaurantOrderDetails", function (req, res) {
  kafka.make_request(
    "restaurantOrderDetails",
    req.body,
    function (err, results) {
      console.log("in result");
      checkAuth;

      console.log(results);
      if (err) {
        console.log("Inside err");
        res.json({
          status: "error",
          msg: "System Error, Try Again.",
        });
      } else {
        console.log("Inside else");
        res.status(200).json(results);
        res.end();
      }
    }
  );
});

// app.post("/getPastOrders", checkAuth, getPastOrders);

app.post("/getReceiptDetails", function (req, res) {
  kafka.make_request("receiptDetails", req.body, function (err, results) {
    console.log("in result");
    checkAuth;

    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again.",
      });
    } else {
      console.log("Inside else");
      res.status(200).json(results);
      res.end();
    }
  });
});

// app.post("/createNewOrder", checkAuth, createNewOrder);

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
