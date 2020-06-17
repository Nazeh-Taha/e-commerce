import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "../actions/productActions";
import Carousel from "../component/Carousel";
// import Slider from "../component/Slider";
import MainSlider from "../component/MainSlider";
function HomeBage() {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const disPatch = useDispatch();

  useEffect(() => {
    disPatch(listProducts());
    return () => {};
  }, []);

  return loading ? (
    <div>loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <>
   
   
   <MainSlider />
      <ul className="products">
        {products.map((product, i) => (
          <li key={i}>
            <div className="product">
              <Link to={"/products/" + product._id}>
                <img
                  className="product-img"
                  src={product.image}
                  alt="product"
                />
              </Link>
              <div className="product-name">
                <Link to={"/products/" + product._id}>{product.name}</Link>
              </div>
              <div className="product-brand">{product.brand}</div>
              <div className="product-price">${product.price}</div>
              <div className="product-rating">
                {product.rating} Stars ({product.numReviews} Reviews)
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
export default HomeBage;
