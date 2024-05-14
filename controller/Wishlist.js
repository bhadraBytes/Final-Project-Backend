const { Wishlist } = require("../model/Wishlist");

// Fetch wishlist items by user
exports.fetchWishlistByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const wishlistItems = await Wishlist.find({ user: id });
    res.status(200).json(wishlistItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
  const { id } = req.user;
  const wishlistItem = new Wishlist({ ...req.body, user: id });
  try {
    const doc = await wishlistItem.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Delete item from wishlist
exports.deleteFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Wishlist.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

// Move item from wishlist to cart
exports.moveToCart = async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch item from wishlist
    const wishlistItem = await Wishlist.findById(id);
    // Create a new cart item using wishlist data
    const cartItem = new Cart({
      quantity: 1, // You can adjust quantity if needed
      product: wishlistItem.product,
      user: wishlistItem.user,
      color: wishlistItem.color,
      size: wishlistItem.size,
    });
    // Save cart item
    const savedCartItem = await cartItem.save();
    // Delete item from wishlist
    await Wishlist.findByIdAndDelete(id);
    res.status(200).json(savedCartItem);
  } catch (err) {
    res.status(400).json(err);
  }
};
