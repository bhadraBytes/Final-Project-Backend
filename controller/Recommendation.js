const { Product } = require("../model/Product");

exports.fetchRecommendations = async (req, res) => {
  const { product } = req.query;
  try {
    // Fetch recommendations based on product category or brand
    const recommendations = await getRecommendations(product);
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(400).json(err);
  }
};

async function getRecommendations(productId) {
  try {
    // Implement logic to fetch recommendations based on product category or brand
    // For example, find products with the same category or brand as the given productId
    const product = await Product.findById(productId);
    if (!product) {
      throw new Error("Product not found");
    }
    const recommendations = await Product.find({ $or: [{ category: product.category }, { brand: product.brand }] });
    return recommendations;
  } catch (err) {
    throw new Error("Error fetching recommendations");
  }
}
