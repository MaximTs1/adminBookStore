const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("./models/User");
const authGuard = require("./auth-guard");
const { JWT_SECRET, getUser } = require("./config");

// GET all users weithout authguard
router.get("/all-users", async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}).select("-password"); // Exclude passwords from the result

    // Send the list of users
    res.status(200).send(users);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Error fetching users");
  }
});

router.get("/login", authGuard, async (req, res) => {
  const user = getUser(req, res);

  res.send(user);
});

//ADD user
router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
      city,
      street,
      houseNumber,
      zip,
    } = req.body;
    const user = new User({
      firstName,
      lastName,
      phone,
      email,
      password: await bcrypt.hash(password, 10),
      city,
      street,
      houseNumber,
      zip,
    });

    const newUser = await user.save();
    delete newUser.password;
    res.status(201).send({ message: "User added successfully" });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send("Error registering user");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(403).send("username or password is incorrect");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(403).send("username or password is incorrect");
  }

  // יצירת אובייקט רגיל מהמחלקה של היוזר
  const userResult = user.toObject();
  // מחיקת הסיסמה מהאובייקט שנשלח למשתמש
  delete userResult.password;
  // יצירת טוקן
  userResult.token = jwt.sign({ user: userResult }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.send(userResult);
});

router.get("/logout", async (req, res) => {});

module.exports = router;
