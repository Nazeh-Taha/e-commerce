import React, {useRef, useState, useEffect } from "react";
import "../styles/Navbar.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TweenMax, Power3, TimelineLite } from "gsap";
import logo from "../images/logo.png";

const NavBar = () => {
  //get user info from store
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let userAcount = useRef(null);
  let adminAcountMeneu = useRef(null);
  let tl = new TimelineLite();
  let [width, setWidth] = useState(0);
  let delay = 300;

  function delayed() {
    setWidth((width += 10));
    if (width > 20) {
      delay += 2;
    }
    if (width < 100) {
      setTimeout(delayed, delay);
    }
    setTimeout(function () {
      document.querySelector(".progress-div").classList.add("hide");
    }, 6000);
  }
 //navbar dropmeneu animate
  const showMeneu =() =>{
    // TweenMax.to(adminAcountMeneu, 0.8, { opacity: 1, ease: Power3.easeOut });
    tl.to(adminAcountMeneu, 0.1, { opacity: 1, ease: Power3.easeOut })
    .to(adminAcountMeneu, 0.1, {clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)", ease: Power3.ease},.2);
  }
  const hideMeneu=()=>{
    tl.to(adminAcountMeneu, 0.1, { opacity: 0, ease: Power3.easeOut })
    .to(adminAcountMeneu, 0.1, {clipPath: "polygon(0 0, 100% 0%, 100% 10%, 0 100%)", ease: Power3.ease },.2);
  }
  useEffect(() => {
    delayed();
console.log(userAcount);

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
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        <ul className="navbar-user">
          <li>
            <Link to="/search" className="navbar-user--icon rotate">&#9906;</Link>
          </li>
          <li>
            <Link to="/favaret" className="navbar-user--icon">&#9825;</Link>
          </li>
          <li>
            {userInfo.isAdmin ?
            <div className="navbar-user--login">
            <Link to="/" onMouseEnter={showMeneu} onMouseLeave={hideMeneu}>Admin</Link>
            <ul ref={el=>{adminAcountMeneu=el}} >
              <li><Link to="/admin/dashbord">Dashboard</Link></li>
              <li><Link to="/admin/dashbord">Logout</Link></li>
            </ul>
            </div>
            : ! userInfo.isAdmin ?
            <Link to="/" ref={el=>{userAcount=el}}>Hi {userInfo.name}</Link>
            :
            <Link to="/signin">My Acount</Link>}
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
