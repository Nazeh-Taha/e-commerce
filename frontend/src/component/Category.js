import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Category.scss";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/categoryActions";
const Category = () => {
  const dispatch = useDispatch();
  const categorylist = useSelector((state) => state.categorylist);
  const { loading, categories } = categorylist;
  useEffect(() => {
    dispatch(listCategories());
  }, []);

  return (
    <div>
      <div className="category-container">
        <div className="category-container--warpper">
          <Grid container spacing={6} className="category-container--row">
            {categories.map((category, index) => (
              <Grid
                item
                xs={6}
                sm={6}
                md={3}
                className="product-category"
                key={index}
              >
                <div className="category__item">
                  <div className="category__image">
                    <Link to="/" className="category__image--link">
                      <div className="category__image--warpper">
                        <img
                          src={`/api/category/uploadimage/${category.imgId}`}
                          alt="img"
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="category__contant">
                    <Link to="/">{category.productNum} Products</Link>
                    <Link to="/">{category.name}</Link>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Category;
