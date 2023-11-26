const express = require("express");
const router = express.Router();
const User = require("./models/User");

// GET all users
router.get("/get-users", async (req, res) => {
  try {
    const users = await User.find({}); // Find all users
    res.status(200).send(users); // Send the array of users as response
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Error retrieving users");
  }
});

//ADD user
router.post("/add-user", async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      zip: req.body.zip,
    });

    await user.save();
    res.status(201).send({ message: "User added successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Error registering user");
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user && user.password === password) {
    // Login successful
    res.send("Login successful");
  } else {
    // Invalid credentials
    res.status(401).send("Invalid login credentials");
  }
});

module.exports = router;
