import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";



function CartBage(props) {

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) =>{
    dispatch(removeFromCart(productId));
 }
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, []);
  return (
    <div className="cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Shoping List</h3>
            <div>Price</div>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart Is Empty</div>
          ) : (
            cartItems.map((item) => (
              <>
                <li>
                  <div className="cart-image">
                    <img src={item.image} alt="image" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/products/" + item.product}>{item.name}</Link>
                    </div>
                    QTY:
                    <select>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <button type="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
                  </div>

                  <div className="cart-price">${item.price}</div>
                </li>
              </>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)} items) : $(
          {cartItems.reduce((a, b) => a + b.price * b.qty, 0)})
        </h3>
        <button disabled={cartItems.length === 0}>Confirm Shoping</button>
      </div>
    </div>
  );
}

export default CartBage;
