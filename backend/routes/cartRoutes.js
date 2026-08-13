const express = require("express");
const {
  addToCart,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");

const router = express.Router();

router.post("/cart", addToCart);
router.delete("/cart", removeFromCart);
router.delete("/clear-cart", clearCart);

module.exports = router;
