const { Wishlist } = require("../model/Wishlist");
const { Cart } = require("../model/Cart");

exports.fetchWishlistByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const wishlistItems = await Wishlist.find({ user: id }).populate("product");
    res.status(200).json(wishlistItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToWishlist = async (req, res) => {
  const { id } = req.user;
  const wishlist = new Wishlist({ ...req.body, user: id });
  try {
    const doc = await wishlist.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Wishlist.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.moveToCart = async (req, res) => {
  const { id } = req.user;
  try {
    const wishlistItems = await Wishlist.find({ user: id });
    for (let item of wishlistItems) {
      const cart = new Cart({ product: item.product, user: id, quantity: 1 });
      await cart.save();
      await Wishlist.findByIdAndDelete(item._id);
    }
    res.status(200).json({ message: "Items moved to cart" });
  } catch (err) {
    res.status(400).json(err);
  }
};
