/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const Country = require("./models/Country");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

router.post("/updateProfile", auth.ensureLoggedIn, (req, res) => {
  const userId = req.user._id;
  const newProfileData = req.body;

  // Update the user profile in the database
  User.findByIdAndUpdate(userId, newProfileData, { new: true })
    .then((updatedUser) => {
      // Send the updated user data back to the client
      res.send(updatedUser);

      // Emit a 'profileUpdate' event to the specific user's socket
      const userSocket = socketManager.getSocketFromUserID(updatedUser._id);
      if (userSocket) {
        userSocket.emit("profileUpdated", updatedUser);
      }
    })
    .catch((error) => {
      console.error("Error updating user profile:", error);
      res.status(500).send({ msg: "Error updating profile" });
    });
});

router.get("/countries/Easy", (req, res) => {
  Country.find({}, "Country twoCode Lat Long Adjacent Dish Easy") // Projection to get only twoCode, Lat, Long fields
    .then((countries) => {
      res.send(countries);
    })
    .catch((err) => {
      console.error("Error fetching countries:", err);
      res.status(500).send({ msg: "Error fetching country data" });
    });
});

router.get("/countries/Hard", (req, res) => {
  Country.find({ Hard: { $ne: [] } }, "Country twoCode Lat Long Adjacent Dish Hard")
    .then((countries) => {
      res.send(countries);
    })
    .catch((err) => {
      console.error("Error fetching countries with non-empty 'Hard' lists:", err);
      res.status(500).send({ msg: "Error fetching country data" });
    });
});

router.get("/countries/Medium", (req, res) => {
  Country.find({ Hard: { $ne: [] } }, "Country twoCode Lat Long Adjacent Dish Medium")
    .then((countries) => {
      res.send(countries);
    })
    .catch((err) => {
      console.error("Error fetching countries with non-empty 'Hard' lists:", err);
      res.status(500).send({ msg: "Error fetching country data" });
    });
});

const recordWinAndUpdateProfile = async (userId) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $inc: { wins: 1 } }, // Increment the win count
      { new: true } // Return the updated user document
    );

    // Emit an event with the updated user profile
    const userSocket = socketManager.getSocketFromUserID(userId);
    if (userSocket) {
      userSocket.emit("profileUpdated", updatedUser);
    }
  } catch (error) {
    console.error("Error updating user profile:", error);
    // Handle error appropriately
  }
};
// Route that gets called when a user wins a game
router.post("/recordWin", auth.ensureLoggedIn, async (req, res) => {
  const userId = req.user._id;

  try {
    await recordWinAndUpdateProfile(userId);
    res.send({ success: true, message: "Win recorded and profile updated." });
  } catch (error) {
    console.error("Error recording win:", error);
    res.status(500).send({ success: false, message: "Error recording win." });
  }
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
