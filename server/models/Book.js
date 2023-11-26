const mongoose = require("mongoose");

// Define the Book schema
const bookSchema = new mongoose.Schema({
  customId: { type: Number, required: true, unique: true },
  name: String,
  author: String,
  category: String,
  price: Number,
  image: String,
  condition: String,
  book_parts: Number,
  stock: Number,
  hand: Number,
  publishing_year: Number,
  translation: String,
  publisher: String,
  description: String,
});

// Create a model based on the schema
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
