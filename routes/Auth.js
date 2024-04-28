const express = require("express");
const { createUser, loginUser, checkAuth, logout, resetPasswordRequest ,resetPassword} = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();
// /products is already added as base path
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkAuth)
  .get("/logout", logout)
  .post("/reset-password-request", resetPasswordRequest)
  .post("/reset-password", resetPassword)

exports.router = router;
