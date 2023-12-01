const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    customId: { type: Number, required: true, unique: true },
    firstName: String,
    lastName: String,
    phone: Number,
    email: String,
    password: String,
    city: String,
    street: String,
    houseNumber: Number,
    zip: Number,
    likedBooks: [String],
  },
  { collection: "users" }
);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
