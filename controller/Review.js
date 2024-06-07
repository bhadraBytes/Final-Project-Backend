const { Review } = require("../model/Review");
const { Product } = require("../model/Product");

exports.addReview = async (req, res) => {
  const review = new Review({ ...req.body, user: req.user.id });
  try {
    const doc = await review.save();

    // Recalculate product rating
    const reviews = await Review.find({ product: req.body.product });
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / reviews.length;

    const product = await Product.findById(req.body.product);
    product.rating = averageRating;
    await product.save();

    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchReviewsByProduct = async (req, res) => {
  const { product } = req.query;
  try {
    const reviews = await Review.find({ product }).populate("user");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    const reviews = await Review.find({ product: review.product });
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / reviews.length;

    const product = await Product.findById(review.product);
    product.rating = averageRating;
    await product.save();

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    const reviews = await Review.find({ product: review.product });
    const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / reviews.length;

    const product = await Product.findById(review.product);
    product.rating = averageRating;
    await product.save();

    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};
