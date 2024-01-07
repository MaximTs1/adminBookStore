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

// Parse JSON payloads
app.use(express.json({ limit: "50mb" }));

// Parse URL-encoded payloads
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Dynamic CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin
      if (!origin) return callback(null, true);

      // Check if the origin is in the list of allowed origins
      if (
        origin.startsWith("http://localhost:") ||
        origin.startsWith("https://localhost:")
      ) {
        return callback(null, true);
      }

      // Disallow other origins
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

app.use("/api", bookRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
