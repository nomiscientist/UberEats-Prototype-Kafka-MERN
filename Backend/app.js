const express = require("express");
const cors = require("cors");

const kafka = require("./kafka/client");

// const Router = require("./routes");
const path = require("path");
var bodyParser = require("body-parser");

const passport = require("passport");
const { checkAuth } = require("./Controller/Common/passport");
const { auth } = require("./Controller/Common/passport");

const app = express();
const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: "AKIAZJZS76WTOJJJGHU3",
  secretAccessKey: "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",
});

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

const uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    acl: "public-read",
    bucket: "bucket-name",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

app.post("/upload", uploadS3.single("file"), (req, res) => {
  console.log(req.file);
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

//------------------------------------------------------------------------------
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

app.get("/getProfileInfo", upload.single("file"), function (req, res) {
  kafka.make_request("profileInfo", req.query, function (err, results) {
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
});

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

app.post("/updateProfileInfo", upload.single("file"), function (req, res) {
  kafka.make_request("updateProfileInfo", req.body, function (err, results) {
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
});

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

app.post("/getTypeaheadList", function (req, res) {
  kafka.make_request("typeaheadList", req.body, function (err, results) {
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

app.get("/getDeliveryAddress", function (req, res) {
  kafka.make_request("deliveryAddress", req.query, function (err, results) {
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

app.post("/getListOfRestaurants", function (req, res) {
  kafka.make_request("listOfRestaurants", req.body, function (err, results) {
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

app.post("/createFavouritesList", function (req, res) {
  kafka.make_request("createFavorite", req.body, function (err, results) {
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
app.post("/getFavoriteRestaurants", function (req, res) {
  kafka.make_request("favoriteRestaurant", req.body, function (err, results) {
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

app.post("/addOrdertoCart", function (req, res) {
  kafka.make_request("addOrdertoCart", req.body, function (err, results) {
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

app.post("/showCartDetails", function (req, res) {
  kafka.make_request("cartDetails", req.body, function (err, results) {
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
app.post("/updateCartOrderDetails", function (req, res) {
  kafka.make_request("updateCartDetails", req.body, function (err, results) {
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

app.get("/getOrderTotal", function (req, res) {
  kafka.make_request("orderTotal", req.query, function (err, results) {
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

app.get("/getDeliveryType", function (req, res) {
  kafka.make_request("deliveryType", req.query, function (err, results) {
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

app.post("/addDeliveryAddress", function (req, res) {
  kafka.make_request("addDeliveryAddress", req.body, function (err, results) {
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

app.post("/bookOrder", function (req, res) {
  kafka.make_request("bookorder", req.body, function (err, results) {
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

app.post("/getPastOrders", function (req, res) {
  kafka.make_request("pastOrders", req.body, function (err, results) {
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

app.post("/createNewOrder", function (req, res) {
  kafka.make_request("newOrder", req.body, function (err, results) {
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

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

module.exports = app;
