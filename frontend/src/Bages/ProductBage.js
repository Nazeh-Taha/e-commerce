import React from "react";
import data from "../data";
import { Link } from "react-router-dom";

function ProductBage({ match }) {
  const id = match.params.id;
  const product = data.products.find((item) => item._id === id);

  return (
    <>
      <div>
        <Link to="/">Back To Home</Link>
      </div>
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
              <li>
                  Price: {product.price}
              </li>
              <li>
                  Status: {product.status}
              </li>
              <li>
                  Qty: <select>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                  </select>
              </li>
              <li>
                  <button>Add To Cart</button>
              </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default ProductBage;
