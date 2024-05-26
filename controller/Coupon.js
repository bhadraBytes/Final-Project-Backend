// controllers/CouponController.js
const Coupon = require("../model/Coupon");

exports.addOrUpdateCoupon = async (req, res) => {
  const { code, discount, expirationDate, usageLimit } = req.body;

  try {
    let coupon = await Coupon.findOne({ code });

    if (coupon) {
      // If coupon exists, update it
      coupon.discount = discount;
      coupon.expirationDate = expirationDate;
      coupon.usageLimit = usageLimit;
    } else {
      // If coupon does not exist, create a new one
      coupon = new Coupon({
        code,
        discount,
        expirationDate,
        usageLimit,
      });
    }

    // Save the coupon to the database
    await coupon.save();

    // Respond with the updated coupon data
    res
      .status(200)
      .json({ message: "Coupon added or updated successfully", coupon });
  } catch (err) {
    // Handle any errors
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.deleteCoupon = async (req, res) => {
  const { code } = req.params;

  try {
    await Coupon.deleteOne({ code });
    res.status(200).json({ code });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.validateCoupon = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon code" });
    }

    if (coupon.expirationDate < new Date()) {
      return res.status(400).json({ message: "Coupon has expired" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ message: "Coupon usage limit exceeded" });
    }

    res.status(200).json({ discount: coupon.discount });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// controllers/CouponController.js
exports.incrementCouponUsedCount = async (req, res) => {
  const { code } = req.body;

  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon) {
      return res.status(404).json({ success: false, message: "Coupon not found" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: "Coupon usage limit exceeded" });
    }

    coupon.usedCount += 1;
    await coupon.save();

    res.status(200).json({ success: true, message: "Coupon usage count incremented", coupon });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err });
  }
};
