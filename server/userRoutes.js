const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("./models/User");
const authGuard = require("./auth-guard");
const { JWT_SECRET, getUserId } = require("./config");
const Counter = require("./models/Counter");

// GET all users weithout authguard - needs auth to all manager
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
  const _id = getUserId(req, res);

  try {
    const LoggedUser = await User.findOne({ _id });

    if (!LoggedUser) {
      return res.status(403).send("username or password is incorrect");
    }

    // Note: Consider using select to exclude fields instead of delete
    delete LoggedUser.password;
    delete LoggedUser.email;

    res.send(LoggedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
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
      likedBooks: [],
      orderHistory: [],
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
  userResult.token = jwt.sign({ id: userResult._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.send(userResult);
});

router.get("/logout", authGuard, async (req, res) => {});

router.put("/get-user-info/:customId", authGuard, async (req, res) => {
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

    const resultUser = await user.save();
    delete resultUser.password;
    res.send(resultUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-likedBooks/:customId", authGuard, async (req, res) => {
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

router.get("/get-favorite-books/:customId", authGuard, async (req, res) => {
  try {
    const customId = req.params.customId;
    const user = await User.findOne({ customId: customId });
    if (user) {
      res.json(user.likedBooks);
    } else {
      res.status(404).send("User with the specified customId not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/update-order-history/:customId", authGuard, async (req, res) => {
  try {
    const { customId } = req.params;
    const { cart, date, orderStatus } = req.body;

    const user = await User.findOne({ customId });
    if (!user) {
      return res.status(404).send("User not found!");
    }

    user.orderHistory.push({ cart, date, orderStatus });
    await user.save();

    const updatedUserInfo = { orderHistory: user.orderHistory };
    res.json(updatedUserInfo);
  } catch (error) {
    console.error("Error in update-order-history route:", error); // Log the specific error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/order-history/:customId", async (req, res) => {
  try {
    const { customId } = req.params;
    const user = await User.findOne({ customId });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user.orderHistory);
  } catch (error) {
    console.error("Error fetching order history:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/orders", async (req, res) => {
  try {
    const users = await User.find({});
    const ordersData = users.reduce((acc, user) => {
      // Check if the user has an order history
      if (user.orderHistory && user.orderHistory.length > 0) {
        const userOrders = user.orderHistory.map((order) => ({
          id: order._id,
          date: order.date,
          status: order.orderStatus,
          cart: order.cart,
          customer: {
            initial: user.firstName[0],
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
          },
        }));
        acc.push(...userOrders);
      }
      return acc;
    }, []);

    res.json(ordersData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

router.put("/updateOrderStatus/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    // Iterate over users to find the order
    const user = await User.findOne({ "orderHistory._id": orderId });

    if (user) {
      // Find the specific order in the user's order history
      const order = user.orderHistory.find((o) => o._id.toString() === orderId);

      if (order) {
        // Update the order status
        order.orderStatus = status;

        // Save the changes
        await user.save();

        return res
          .status(200)
          .send({ message: "Order status updated successfully" });
      }
    }

    // If order not found
    res.status(404).send({ message: "Order not found" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
