const express = require("express");
const {
  addToWishlist,
  fetchWishlistByUser,
  deleteFromWishlist,
  moveToCart,
} = require("../controller/Wishlist");

const router = express.Router();
router
  .post("/", addToWishlist)
  .get("/", fetchWishlistByUser)
  .delete("/:id", deleteFromWishlist)
  .post("/move-to-cart", moveToCart);

exports.router = router;
