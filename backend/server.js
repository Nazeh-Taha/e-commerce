import express from "express";
import dotenv from "dotenv";
import path from 'path';
import userRouter from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import categoryRoute from "./routes/categoryRoute";
import imageRoute from "./routes/imageRoute";
import { dbConnection,conn } from "./dbConnect";

dotenv.config();

const PORT = process.env.PORT || 8000;
//connecting to DB
dbConnection();

const app = express();
app.use(express.json());
// app.use("/uploads", express.static('uploads'));
app.use("/api/users", userRouter);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/image", imageRoute)

app.use('/uploads', express.static(path.join(__dirname, './uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
app.listen(PORT, () => {
  console.log("listen to port 8000");
});
