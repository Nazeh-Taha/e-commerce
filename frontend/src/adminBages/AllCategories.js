import React, {  useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
import { Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
const AllCategories = () => {
  const categorylist = useSelector((state) => state.categorylist);
  const {loading, categories} = categorylist;
  const classes = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategories());
  }, []);
  return (
    <Container maxWidth="sm">
      <h1>All Categories</h1>
      <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">December</ListSubheader>
        </GridListTile>
        {categories.map((category,index) => (
          <GridListTile key={index}>
            <img src={`/api/category/uploadimage/${category.imgId}`} alt="img" />
            <GridListTileBar
              title={category.name}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
    </Container>
  );
};

export default AllCategories;
