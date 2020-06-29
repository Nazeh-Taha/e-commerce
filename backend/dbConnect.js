import dotenv from "dotenv";
import config from "./config";
import mongoose from "mongoose";
dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const conn = mongoose.createConnection(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
const dbConnection = () => {
  mongoose
    .connect(mongodbUrl, {
     useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err));
};
export { dbConnection, conn };
