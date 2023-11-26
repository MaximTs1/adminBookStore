const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    password: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
  },
  { collection: "users" }
);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
