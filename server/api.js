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

router.get("/profile", auth.ensureLoggedIn, (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(500).send({ msg: "Error fetching user data" });
  }
});

router.get("/countries", (req, res) => {
  Country.find({}, "Country twoCode Lat Long Adjacent") // Projection to get only twoCode, Lat, Long fields
    .then((countries) => {
      res.send(countries);
    })
    .catch((err) => {
      console.error("Error fetching countries:", err);
      res.status(500).send({ msg: "Error fetching country data" });
    });
});

router.post("/incrementWin", auth.ensureLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { wins: 1 } }, // Increment wins
      { new: true } // Return the updated document
    );
    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating win count:", error);
    res.status(500).send({ msg: "Error updating win count" });
  }
});
// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
