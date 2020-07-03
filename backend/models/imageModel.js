import mongoos from "mongoose";

const imageSchema = new mongoos.Schema({
    imgCollection: {
        type: Array
    }

});

const imageModel = mongoos.model("Image", imageSchema);

export default imageModel;