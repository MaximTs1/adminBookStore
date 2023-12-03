const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  amount: Number,
  price: Number,
  // Removed other properties to keep only id, name, amount, and price
});

// Schema for an order in the order history
const orderSchema = new mongoose.Schema({
  cart: [cartItemSchema],
  date: Date, // or String, depending on how you store dates
});

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
    orderHistory: [orderSchema],
  },
  { collection: "users" }
);

// Create a model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
