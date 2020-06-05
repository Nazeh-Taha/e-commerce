import React, { useEffect } from "react";
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

function CartBage(props) {
  const cart = useSelector(state=>state.cart);
  const {cartItems} = cart;
  const dispatch = useDispatch();
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
          {cartItems.length === 0 ? 
            (<div>Cart Is Empty</div>)
           : 
            cartItems.map(item => 
              <>
              <div>
                <img src={item.image} alt="image" />
                <div className="cart-name">
                  <div>{item.name}</div>
                </div>
                <div>
                  QTY:
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div>
                {item.price}
              </div>
            </>
          )}
        </ul>
      </div>
      <div className="cart-action"></div>
    </div>
  );
}

export default CartBage;
