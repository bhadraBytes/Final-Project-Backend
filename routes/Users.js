const express = require("express");
const { fetchUserById, updateUser, fetchAllUsers } = require("../controller/User");

const router = express.Router();

router.get("/own/", fetchUserById)
      .patch("/:id", updateUser)
      .get("/", fetchAllUsers); // Add a new route for fetching all users

exports.router = router;
