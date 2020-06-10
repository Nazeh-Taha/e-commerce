import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";
import bcrypt from "bcryptjs";
const router = express.Router();

//Login user & admin
router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
  });

  if (signinUser) {
    const validPass = bcrypt.compareSync(
      req.body.password,
      signinUser.password
    );
    if (validPass) {
      res.header("auth_token", getToken(signinUser)).send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ msg: "Invalid Email or Password." });
    }
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

// create new user
router.post("/register", async (req, res) => {
  //chech if user exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send({ msg: "User Is Exists" });
  //hash password and add solt
  const solt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(req.body.password, solt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  const newUser = await user.save();
  if (newUser) {
    const token = await getToken(newUser);
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: token,
    });
  } else {
    res.status(401).send({ msg: "Invalid User Data." });
  }
});
// Create Admin Acount
router.get("/createadmin", async (req, res) => {
  const solt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync("admin", solt);
  try {
    const user = new User({
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      isAdmin: true,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send("Admin Acount Created");
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
