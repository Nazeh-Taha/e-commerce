import express from "express";
import dotenv from "dotenv";
import config from "./config";
import data from "./data";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";

dotenv.config();
const PORT = process.env.PORT || 8000;
const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find((x) => x._id === productId);
  if (product) res.send(product);
  else res.status(404).send({ msg: "product not found" });
});

app.listen(PORT, () => {
  console.log("listen to port 8000");
});
