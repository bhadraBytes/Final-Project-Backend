const { Review } = require("../model/Review");

exports.addReview = async (req, res) => {
  const review = new Review({ ...req.body, user: req.user.id });
  try {
    const doc = await review.save();
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
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findByIdAndDelete(id);
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json(err);
  }
};
