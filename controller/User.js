const { User } = require("../model/User");

exports.fetchUserById = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);
    res
      .status(200)
      .json({
        id: user.id,
        addresses: user.addresses,
        email: user.email,
        role: user.role,
        name: user.name,
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};
