const express = require("express");
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder } = require("../controller/Order");

const router = express.Router();
// /order is already added as base path
router
  .post("/", createOrder)
  .get("/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);

exports.router = router;
