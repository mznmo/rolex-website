const Cart = require("../models/Cart");
const Product = require("../models/Product");

const getCartItems = async () => {
  const items = await Cart.find();
  const products = await Product.find();

  return items.map((item) => {
    const product = products.find((p) => p.id === item.id);
    return {
      id: item.id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
      quantity: item.quantity,
    };
  });
};

const addToCart = async (req, res, next) => {
  try {
    const { id, quantity } = req.body;
    const product = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const existingItem = await Cart.findOne({ id });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      await Cart.create({ id, quantity });
    }

    const cart = await getCartItems();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { id } = req.body;
    const existingItem = await Cart.findOne({ id });

    if (existingItem && existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      await existingItem.save();
    } else {
      await Cart.findOneAndDelete({ id });
    }

    const cart = await getCartItems();
    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    next(error);
  }
};

module.exports = { addToCart, removeFromCart, clearCart };
