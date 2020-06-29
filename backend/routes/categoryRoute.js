import express from "express";
import Category from "../models/categoryModel";
import crypto from "crypto";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import methodOverride from "method-override";
import { isAuth, isAdmin } from "../util";
import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "../config";
import { conn } from "../dbConnect";
dotenv.config();
const mongodbUrl = config.MONGODB_URL;
const router = express.Router();
let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
  console.log("Connection Successful");
});

const storage = new GridFsStorage({
  url: mongodbUrl,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });
// upload image for category
router.post("/uploadimage", upload.single("file"), (req, res, err) => {
  res.json({ file: req.file });
  // if (err) throw err;
  res.status(201).send();
});
router.get("/uploadimage/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }

    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image",
      });
    }
  });
});
//create new category
router.post("/", async (req, res) => {
  const category = new Category({
    name: req.body.name,
    imgId: req.body.imgId,
  });

  const newCategory = category.save();

  if (newCategory.length) {
    res.status(201).send({ msg: "New Category Created", data: newCategory });
  } else {
    res.status(500).send({ msg: "Error in Creatin Category" });
  }
});

export default router;
