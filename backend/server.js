import express from "express";
import data from "./data";
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);
  if (product) res.send(product);
  else res.status(404).send({ msg: "product not found" });
});

app.listen(PORT, () => {
  console.log("listen to port 8000");
});
