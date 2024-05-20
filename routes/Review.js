const express = require("express");
const {
  addReview,
  fetchReviewsByProduct,
  updateReview,
  deleteReview,
} = require("../controller/Review");

const router = express.Router();

router
  .post("/", addReview)
  .get("/", fetchReviewsByProduct)
  .patch("/:id", updateReview)
  .delete("/:id", deleteReview);

exports.router = router;
