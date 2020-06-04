import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";

function ProductBage(props) {
  const [qty,setQty] = useState(1);
  const id = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    
    dispatch(detailsProduct(id));
    return () => {};
  }, []);
  return (
    <>
      <div>
        <Link to="/">Back To Home</Link>
      </div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-img">
            <img src={product.image} alt="img" />
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews} Reviews)
              </li>
              <li>
                Price:<b>${product.price}</b>
              </li>
              <li>
                Description:
                <div>{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price: {product.price}</li>
              <li>Status: {product.status}</li>
              <li>
               
              Qty: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                  {
                    [...Array(product.countInStack).keys()].map(x=>
                      <option key={x} value={x+1}>{x+1}</option>)
                  }
                </select>
              </li>
              <li>
                <button>Add To Cart</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
export default ProductBage;
