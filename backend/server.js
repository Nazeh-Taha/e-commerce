import express from "express";
import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute";
import productRoute from "./routes/productRoute";

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
app.use("/api/products", productRoute)


app.listen(PORT, () => {
  console.log("listen to port 8000");
});
