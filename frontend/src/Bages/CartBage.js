import React, { useEffect } from "react";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartBage(props) {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () =>{
    props.history.push("/signin?redirect=shiping")
  }
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    
      
 
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
            cartItems.map((item,i) => (
              <div key={i}>
                <li >
                  <div className="cart-image">
                    <img src={item.image} alt="image" />
                  </div>
                  <div className="cart-name">
                    <div>
                      <Link to={"/products/" + item.product}>{item.name}</Link>
                    </div>
                    QTY:
                    <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product, e.target.value))}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>

                  <div className="cart-price">${item.price}</div>
                </li>
              </div>
            ))
          )}
        </ul>
      </div>
      <div className="cart-action">
        <h3>
          Subtotal ({cartItems.reduce((a, b) => parseInt(a)+ parseInt(b.qty), 0)} items) : $(
          {cartItems.reduce((a, b) => a + b.price * b.qty, 0)})
        </h3>
        <button onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</button>
      </div>
    </div>
  );
}

export default CartBage;
