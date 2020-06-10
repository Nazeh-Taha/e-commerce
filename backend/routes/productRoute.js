import express from "express";
import Product from "../models/productModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

// get all products
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

//find one product
router.get("/:id", async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: "product not found" });
  }
});
// create new products
router.post("/", isAuth, isAdmin, async (req, res) => {
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
// edit one product 
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) product.name = req.body.name;
  product.image = req.body.image;
  product.brand = req.body.brand;
  product.price = req.body.price;
  product.category = req.body.category;
  product.countInStock = req.body.countInStock;
  product.description = req.body.description;
  const UpdatedProduct = await product.save();
  if (UpdatedProduct) {
    res.status(200).send({ msg: "Product Updated", data: UpdatedProduct });
  } else {
    res.status(500).send({ msg: "Error in Updating Product" });
  }
});
//delete one product
router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  const deleteedProduct = await Product.findByIdAndRemove(id);
  if (deleteedProduct) {
    res.send({ msg: "Product Deleted Succsses" });
  } else {
    res.send({ msg: "ERROR in Deletion" });
  }
});

export default router;
