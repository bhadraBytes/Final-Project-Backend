const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0, "Wrong Min Price"],
    max: [10000, "Wrong Max Price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "Wrong Min Percentage"],
    max: [99, "Wrong Max Percentage"],
  },
  rating: {
    type: Number,
    min: [0, "Wrong Min Percentage"],
    max: [5, "Wrong Max Percentage"],
    default: 0,
  },
  stock: {
    type: Number,
    min: [0, "Wrong Min Percentage"],
    default: 0,
  },
  title: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Product = mongoose.model("Product", productSchema);
