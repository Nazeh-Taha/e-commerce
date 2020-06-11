import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { addToCart } from "../actions/cartActions";
function ProductBage(props) {
  const [qty, setQty] = useState(1);
  
  const id = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(id));
   
    return () => {
      //
    };
  }, []);
 
  const handleAddToCart = () => {
    dispatch(addToCart(id, qty));
    props.history.push("/cart");
  };
  return <div>
      <div>
        <Link to="/">Back To Home</Link>
      </div>
      {loading ? 
        <div>loading...</div>
      : error ? 
        <div>{error}</div>
      :  (
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
              <li>
                Status: {product.countInStock > 0 ? "In Stack" : "Out of Stack"}
              </li>
              <li>
                Qty:{" "}
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && 
                  <button onClick={handleAddToCart}>Add To Cart</button>
                }
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
 
}
export default ProductBage;
