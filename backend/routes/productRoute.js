import express from "express";
import Product from "../models/productModel";
import { getToken } from "../util";
const router = express.Router();

// create new user
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (product) res.send(product);
  else res.status(404).send({ msg: "product not found" });
});

router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
  });

  const newProduct = product.save();

  if (newProduct) {
    res.status(201).send({ msg: "New Product Created", data: newProduct });
  } else {
    res.status(500).send({ msg: "Error in Creatin Product" });
  }
});
export default router;
