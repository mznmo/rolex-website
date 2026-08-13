const Product = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const { name, image, description, price, category } = req.body;
    const product = await Product.create({
      name,
      image,
      description,
      price,
      category,
    });
    res.status(201).json(product);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProducts, createProduct };
