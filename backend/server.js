import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import { dbConnection,conn } from "./dbConnect";
dotenv.config();

const PORT = process.env.PORT || 8000;
//connecting to DB
dbConnection();

const app = express();
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);

app.listen(PORT, () => {
  console.log("listen to port 8000");
});
