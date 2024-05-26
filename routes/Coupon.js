const express = require("express");
const {
  addOrUpdateCoupon,
  validateCoupon,
  getAllCoupons,
  deleteCoupon,
  incrementCouponUsedCount,
} = require("../controller/Coupon");

const router = express.Router();

router.post("/addOrUpdate", addOrUpdateCoupon); // Add this route for adding or updating a coupon
router.get("/", getAllCoupons);
router.delete("/:code", deleteCoupon);
router.post("/validate", validateCoupon);
router.post("/incrementUsedCount", incrementCouponUsedCount); // Add this route

exports.router = router;
