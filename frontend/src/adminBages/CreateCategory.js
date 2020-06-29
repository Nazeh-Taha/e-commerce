import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Container,
  TextField,
  LinearProgress,
  Box,
} from "@material-ui/core";
import AlertMessage from "../component/AlertMessage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { saveCategory } from "../actions/categoryActions";
import axios from "axios";
import "../styles/CreateCategory.scss";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [alertMessage, setAlertMessage] = useState({});
  const [imageId, setImageId] = useState({});
  const [uploadPersentage, setUploadPersentage] = useState(0);
  const [file, setFile] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  //git file info
  const onChange = (event) => {
    setFile(event.target.files[0]);
  };
  //show alert message
  const showMessage = (msg) => {
    setAlertMessage(msg);
  };
  //clear message - close alert 
  const clearMessage = () => {
    setAlertMessage({});
  };
  // uploading image function
  const handleUpluadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    try {
      if (file) {
        const res = await axios.post("/api/category/uploadimage", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (ProgressEvent) => {
            setUploadPersentage(
              parseInt(
                Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
              )
            );
            setTimeout(() => setUploadPersentage(0), 10000);
          },
        });
        setImageId(res.data.file.id);
        document
          .getElementById("img")
          .setAttribute(
            "src",
            `/api/category/uploadimage/${res.data.file.filename}`
          );
      } else {
        showMessage({ msg: "ERROR - Please Choose Image", type: "error" });
      }
    } catch (err) {
      console.log(err);
      showMessage({ msg: "ERROR - The image was not uploaded", type: "error" });
    }
  };

  // handling create new category
  const handleSaveCategory = () => {
    dispatch(
      saveCategory({
        name: categoryName,
        imageId: imageId,
      })
    );
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <h1>Create Category</h1>
        <AlertMessage msg={alertMessage} clear={() => clearMessage()} />
        <TextField
          id="outlined-full-width"
          label="Category"
          style={{ margin: 10 }}
          placeholder="Category Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        {/* <input type="file" name="fileToUpload" id="fileToUpload"  value={categoryImage}
        onChange={(e)=>setCategoryImage(e.target.value)}></input> */}
        <form onSubmit={handleUpluadImage} encType="multipart/form-data">
          <input
            type="file"
            className="custom-file-input"
            name="file"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
            onChange={onChange}
          />
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={uploadPersentage} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">{`${Math.round(
                uploadPersentage
              )}%`}</Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
            type="submit"
          >
            Upload
          </Button>
        </form>

        <img id="img" className="category__img"></img>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleSaveCategory}
        >
          Save Category
        </Button>
      </Container>
    </div>
  );
};

export default CreateCategory;
