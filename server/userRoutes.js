const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("./models/User");
const authGuard = require("./auth-guard");
const { JWT_SECRET, getUser } = require("./config");
const Counter = require("./models/Counter");

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
  const countDocument = await Counter.findByIdAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  try {
    const user = new User({
      customId: countDocument.seq,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      zip: req.body.zip,
      likeBooks: [],
    });

    const newUser = await user.save();
    delete newUser.password;
    res.send(newUser);
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

router.put("/get-user-info/:customId", async (req, res) => {
  // try {
  //   const { customId } = req.params;
  //   const updatedData = req.body;
  //   const updatedUser = await User.findOneAndUpdate({ customId }, updatedData, {
  //     new: true, // Return the updated document
  //   });
  //   if (!updatedUser) {
  //     return res.status(404).send("User not found");
  //   }
  //   res.json(updatedUser);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Error updating user");
  // }
  try {
    const { customId } = req.params;
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

    const user = await User.findOne({ customId });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    user.city = city;
    user.street = street;
    user.houseNumber = houseNumber;
    user.zip = zip;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-likedBooks/:customId", async (req, res) => {
  try {
    const { customId } = req.params;
    const { likedBooks } = req.body;

    const user = await User.findOne({ customId });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    user.likedBooks = likedBooks;
    await user.save();

    const updatedUserInfo = { likedBooks: user.likedBooks };
    res.json(updatedUserInfo);
  } catch (error) {
    console.error("Error in update-likedBooks route:", error); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
