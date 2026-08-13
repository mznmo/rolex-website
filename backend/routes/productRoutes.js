const express = require("express");
const {
  getProducts,
  createProduct,
  getFilteredProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.get("/filtered-products", getFilteredProducts);

module.exports = router;
