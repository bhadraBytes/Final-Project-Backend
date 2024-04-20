const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  // the product will be coming from the api body from the frontend
  const user = new User(req.body);
  try {
    const doc = await user.save();
    res.status(201).json({id:doc.id, role:doc.role});
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    // this is just temp then will be using password jwt thing for strong encryption
    if (!user) {
      res.status(401).json({ message: "User Not Found" });
    } else if (user.password === req.body.password) {
        //TODO: late we will be making address an Independent Of Login
      res.status(200).json({id:user.id, role:user.role});
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
