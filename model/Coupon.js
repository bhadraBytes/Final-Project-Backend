// models/Coupon.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const couponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  expirationDate: { type: Date, required: true },
  usageLimit: { type: Number, default: 1 },
  usedCount: { type: Number, default: 0 },
});

const Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;
