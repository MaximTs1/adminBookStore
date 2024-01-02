const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  amount: Number,
  price: Number,
});

const dliveryInfo = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: Number,
  address: String,
  city: String,
  postalCode: Number,
  paymentMethod: String,
});

// Schema for an order in the order history
const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: false, unique: true },
  cart: [cartItemSchema],
  date: Date,
  orderStatus: String,
  info: dliveryInfo,
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
