import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  TextField,
  LinearProgress,
  Box,
} from "@material-ui/core";
//  import ss from "../../../backend/public/c28e785e-434e-4b48-9604-08439285bbc5-accessory.png"
const CreateProducts = () => {
  const layout = useRef(null);
  const [imgCollection, setImgCollection] = useState([]);
  // const [array,setArray] = useState([]);
  const [imgShow, setImgShow] = useState([]);

  const onChange = (e) => {
    let imgArrSave = [...imgCollection];
    let imgArrShow = [...imgShow];
    for (let index = 0; index < e.target.files.length; index++) {
      imgArrSave.push(e.target.files[index]);
      imgArrShow.push(URL.createObjectURL(e.target.files[index]));
      setImgCollection(imgArrSave);
      setImgShow(imgArrShow);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key of Object.keys(imgCollection)) {
      formData.append("imgCollection", imgCollection[key]);
    }
    await axios.post("/api/image/upload-images", formData, {}).then((res) => {
      setImgShow(res.data.userCreated.imgCollection);
    });
  };

  const deleteImage = (index) => {
    let imgArrSave = [...imgCollection];
    let imgArrShow = [...imgShow];
    imgArrShow.splice(index, 1);
    imgArrSave.splice(index, 1);
    setImgShow(imgArrShow);
    setImgCollection(imgArrSave);
  };
  useEffect(() => {
    console.log(layout);
  }, [layout]);
  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <h3>React Multiple File Upload</h3>
        <div className="form-group">
          <input
            ref={layout}
            type="file"
            name="imgCollection"
            onChange={onChange}
            multiple
          />
        </div>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
      {imgShow
        ? imgShow.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt="img"
                style={{ height: "100px", width: "100px" }}
              />
              <button onClick={() => deleteImage(index)}>X</button>
            </div>
          ))
        : null}
    </Container>
  );
};

export default CreateProducts;
