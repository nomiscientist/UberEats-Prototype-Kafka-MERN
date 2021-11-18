"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const RestaurantDetails = require("../../Models/RestaurantDetailsModel");
const CustomerDetails = require("../../Models/CustomerDetailsModel");

// Setup work and export for the JWT passport strategy

function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      if (jwt_payload.restaurantId) {
        const user_id = jwt_payload.restaurantId;
        console.log(jwt_payload);
        console.log("user_id", user_id);
        RestaurantDetails.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }

          if (results) {
            console.log("results", results);
            callback(null, results);
            console.log("back");
          } else {
            callback(null, false);
          }
        });
      } else {
        const user_id = jwt_payload.customerID;
        CustomerDetails.findById(user_id, (err, results) => {
          if (err) {
            return callback(err, false);
          }
          if (results) {
            callback(null, results);
          } else {
            callback(null, false);
          }
        });
      }
    })
  );
}
exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });
