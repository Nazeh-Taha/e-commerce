import mongoos from "mongoose";

const categorySchema = new mongoos.Schema({
  name: { type: String, required: true },
  Qty: { type: Boolean, required: true, default: 0 },
  img: 
    { 
        data: Buffer, 
        contentType: String 
    } 
});

const categoryModel = mongoos.model("Category", categorySchema);

export default categoryModel;
