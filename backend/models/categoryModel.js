import mongoos from "mongoose";

const categorySchema = new mongoos.Schema({
  name: { type: String, required: true },
  imgId: { type: String, required: true },
  productNum: {type: Number, default: 0}
});

const categoryModel = mongoos.model("Category", categorySchema);

export default categoryModel;
