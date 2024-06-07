const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
  fetchAllOrders,
  fetchOrderById,
} = require("../controller/Order");

const router = express.Router();
// /order is already added as base path
router
  .post("/", createOrder)
  .get("/own/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder)
  .get("/", fetchAllOrders)
  .get("/:id", fetchOrderById);

exports.router = router;
