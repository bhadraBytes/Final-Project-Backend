const { Brand } = require("../model/Brand");

exports.fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find({}).exec();
    res.status(200).json(brands)
  } catch (err) {
    res.status(400).json(err)
  }
};

exports.createBrand = async (req, res) => {
    // the product will be coming from the api body from the frontend
    const brand = new Brand(req.body);
    try {
      const doc = await brand.save();
      res.status(201).json(doc);
    } catch (err) {
      res.status(400).json(err);
    }
  };
  