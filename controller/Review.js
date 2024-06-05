const { Review } = require("../model/Review");
// In review controller

const { Product } = require("../model/Product");

// Function to calculate product rating
const calculateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const totalReviews = reviews.length;
  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = totalRating / totalReviews;
  return averageRating;
};

// Update product rating when a review is added, updated, or deleted
const updateProductRating = async (productId) => {
  const rating = await calculateProductRating(productId);
  await Product.findByIdAndUpdate(productId, { rating });
};

// Add Review
exports.addReview = async (req, res) => {
  const review = new Review({ ...req.body, user: req.user.id });
  try {
    const doc = await review.save();
    // Update product rating after adding review
    await updateProductRating(review.product);
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndUpdate(id, req.body, { new: true });
    // Update product rating after updating review
    await updateProductRating(review.product);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    // Update product rating after deleting review
    await updateProductRating(review.product);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};
