const mongoose = require("mongoose");

const userModel = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    income: {
      type: Number,
    },
    city: {
      type: String,
    },
    car: {
      type: String,
    },
    quote: {
      type: String,
    },
    phone_price: {
      type: Number,
    },
  })
);



exports.User = userModel;
