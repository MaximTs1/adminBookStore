const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bookRoutes = require("./bookRoutes");
const userRoutes = require("./userRoutes");

mongoose
  .connect(
    "mongodb://admin:MorMafhidaBesharatim23%23%23@185.229.226.27:27017/BookStore?authSource=admin"
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("https://localhost:")
      ) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS policy does not allow this origin"),
        false
      );
    },
    credentials: true,
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: "Content-Type, Accept, Authorization",
  })
);

app.use("/book", bookRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
