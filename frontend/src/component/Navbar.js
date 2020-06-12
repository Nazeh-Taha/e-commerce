import React, { useState, useEffect } from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";


const NavBar = () => {
  let [width, setWidth] = useState(0);
  let delay = 300;

  function delayed() {
    setWidth((width += 10));
    if (width > 20) {
      delay += 1;
    }
    if (width < 100) {
      setTimeout(delayed, delay);
    }
    setTimeout( function(){
        document.querySelector(".progress-div").classList.add("hide");
      }, 3500 );
  }
  
  

  
  useEffect(() => {
    delayed();
   
    
    return () => {};
  }, []);

  return (
    <>
      <div className="progress-div">
        <div className="progress" style={{ width: `${width}%` }}></div>
      </div>
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">The Shop</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
          <li>
            <Link to="/">Contact</Link>
          </li>
        </ul>
        <div className="navbar-logo">
          <h1>Logo</h1>
        </div>

        <ul className="navbar-user">
          <li>Search</li>
          <li>liked</li>
          <li>My Acount</li>
          <li>Cart</li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
