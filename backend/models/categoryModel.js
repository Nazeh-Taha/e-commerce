import mongoos from "mongoose";

const categorySchema = new mongoos.Schema({
  name: { type: String, required: true },
  imgId: { type: String, required: true },
});

const categoryModel = mongoos.model("Category", categorySchema);

export default categoryModel;
