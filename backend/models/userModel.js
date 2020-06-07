import mongoos from "mongoose";

const userSchema = new mongoos.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, dropDups: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const userModel = mongoos.model("User", userSchema);

export default userModel;
