const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now },
});

const virtual = reviewSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

reviewSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Review = mongoose.model("Review", reviewSchema);
