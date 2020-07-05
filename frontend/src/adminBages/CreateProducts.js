import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  TextField,
  LinearProgress,
  Box,
  IconButton,
  ListSubheader,
  GridListTileBar,
  GridListTile,
  GridList,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@material-ui/core";
import "../styles/CreateProduct.scss";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: "50%",
  },
}));
const CreateProducts = () => {
  const classes = useStyles();
  const [productName, setProductName] = useState("");
  const [brandName, setBrandName] = useState("");
  const [imgCollection, setImgCollection] = useState([]);
  const [uploadPersentage, setUploadPersentage] = useState(0);
  const [imgShow, setImgShow] = useState([]);
  const [category, setCategory] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const categorylist = useSelector((state) => state.categorylist);
  const { categories } = categorylist;
  const dispatch = useDispatch();

  //upload the images
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key of Object.keys(imgCollection)) {
      formData.append("imgCollection", imgCollection[key]);
    }
    await axios
      .post("/api/image/upload-images", formData, {
        onUploadProgress: (ProgressEvent) => {
          setUploadPersentage(
            parseInt(
              Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            )
          );
          setTimeout(() => setUploadPersentage(0), 10000);
        },
      })
      .then((res) => {
        console.log(res.data.imgCollection);
      });
    setImgShow([]);
    setImgCollection([]);
  };
  // get images info from input
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
  // delete image befor upload
  const deleteImage = (index) => {
    let imgArrSave = [...imgCollection];
    let imgArrShow = [...imgShow];
    imgArrShow.splice(index, 1);
    imgArrSave.splice(index, 1);
    setImgShow(imgArrShow);
    setImgCollection(imgArrSave);
  };
  const changeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    // get all Categories
    dispatch(listCategories());
  }, []);
console.log(category);
  return (
    <Container maxWidth="sm">
      <h1>Create Product</h1>
      <form onSubmit={onSubmit}>
        <TextField
          id="outlined-full-width"
          label="Product"
          placeholder="Product Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <TextField
          id="outlined-full-width"
          label="Brand"
          placeholder="Brand Name"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
        {/* upload images section*/}
        <h3>Multiple File Upload</h3>
        <div className="form-group">
          <Button
            variant="contained"
            color="default"
            startIcon={<CloudUploadIcon />}
          >
            <input
              type="file"
              name="imgCollection"
              onChange={onChange}
              id="file"
              className="inputfile"
              multiple
            />
            <label htmlFor="file" className="inputfile--label">
              Choose Product Images
            </label>
          </Button>
          {/* show images section*/}
          <Box display="flex" alignItems="center">
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={uploadPersentage} />
            </Box>
            <Box minWidth={35}>
              <Typography variant="body2" color="textSecondary">
                {uploadPersentage}
              </Typography>
            </Box>
          </Box>
          {imgShow.length ? (
            <GridList cellHeight={180}>
              <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
                <ListSubheader component="div">Uploaded Images</ListSubheader>
              </GridListTile>
              {imgShow.map((img, index) => (
                <GridListTile key={index}>
                  <img src={img} alt="img" />
                  <GridListTileBar
                    actionIcon={
                      <IconButton onClick={() => deleteImage(index)}>
                        <DeleteForeverIcon style={{ color: "red" }} />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          ) : null}
        </div>
        <br></br>
        {/* Category Select */}
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label" >category</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={category}
          onChange={changeCategory}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {categories.map((item,index)=>
          
          <MenuItem value={item.name} key={index}>{item.name}</MenuItem>
          
          )}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        </FormControl>
        
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
    </Container>
  );
};

export default CreateProducts;
