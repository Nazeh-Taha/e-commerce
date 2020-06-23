import React, { useRef, useState, useEffect } from "react";
import "../styles/Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useIntersection } from "react-use";
import { Link } from "react-router-dom";
import gsap, { TweenMax, Power3, Power4 } from "gsap";
import logo from "../images/logo.png";
import { logout } from "../actions/userActions";
import NavbarFixed from "./NavbarFixed";

const NavBar = () => {
  //git user info
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin); //get user info from store
  const { userInfo } = userSignin;

  //get dom element
  let navContainer = useRef(null);
  let linksMenu = useRef(null);
  let layout = useRef(null);
  const intersection = useIntersection(navContainer, {
    root: null,
    rootMargin: "100px",
    threshold: 0.1,
  });
  // the fixed navbar functions
  const topPosition = (element) => {
    gsap.to(element, 0.3, {
      y: "-100%",
      rotation: 4,
      ease: Power4.out,
      stagger: {
        amount: 0.3,
      },
      delay: 0.3,
    });
    gsap.to(element, 0.3, {
      y: "-190%",
      rotation: 0,
      ease: Power4.out,
      stagger: {
        amount: 0.3,
      },
      delay: 0.4,
    });
  };
  const fixedPosition = (element) => {
    gsap.to(element, 0.3, {
      y: "10%",
      rotation: -4,
      ease: Power4.out,
      stagger: {
        amount: 0.3,
      },
      delay: 0.3,
    });
    gsap.to(element, 0.3, {
      y: "0%",
      rotation: 0,
      ease: Power4.out,
      stagger: {
        amount: 0.3,
      },
      delay: 0.4,
    });
  };

  intersection && intersection.intersectionRatio < 0.1
    ? fixedPosition(".navbar--move")
    : topPosition(".navbar--move");
  //progress bar function
  // let delay = 300;

  // function delayed() {
  //   setWidth((width += 10));
  //   if (width > 20) {
  //     delay += 2;
  //   }
  //   if (width < 100) {
  //     setTimeout(delayed, delay);
  //   }
  //   setTimeout(function () {
  //     document.querySelector(".progress-div").classList.add("hide");
  //   }, 6000);
  // }
  //log out function
  const logoutHandler = () => {
    dispatch(logout());
    window.location.reload(false);
  };

  //navbar dropmeneu animate
  //display menu
  const showMeneu = () => {
    TweenMax.to(layout, 0.3, {
      css: { display: "block", opacity: 1 },
      ease: Power3.easeOut,
    });
    TweenMax.to(linksMenu, 0.4, {
      height: "150px",
      ease: Power3.easeOut,
    });
    TweenMax.to(linksMenu, 0.3, {
      clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0 100%)",
      ease: Power3.easeOut,
      delay: 0.1,
    });
    TweenMax.to(linksMenu, 0.3, {
      display: "block",
      opacity: 1,
      ease: Power3.easeOut,
    });
    TweenMax.to(linksMenu.children[0], 0.5, {
      opacity: 1,
      y: 0,
      ease: Power3.easeOut,
      delay: 0.1,
    });
    TweenMax.to(linksMenu.children[1], 0.5, {
      opacity: 1,
      y: 0,
      ease: Power3.easeOut,
      delay: 0.2,
    });
  };
  //hide menu

  const hideMeneu = () => {
    TweenMax.to(layout, 0.01, {
      display: "none",
      opacity: 0,
      ease: Power3.ease,
    });

    TweenMax.to(linksMenu, 0.01, {
      height: "50px",
      display: "none",
      opacity: 0,
      clipPath: "polygon(0 0, 100% 0%, 100% 10%, 0 100%)",

      ease: Power3.ease,
    });
    TweenMax.to(linksMenu.children[0], 0.01, {
      opacity: 0,
      y: 20,
      ease: Power3.ease,
    });
    TweenMax.to(linksMenu.children[1], 0.01, {
      opacity: 0,
      y: 20,
      ease: Power3.ease,
    });
  };

  useEffect(() => {
    // delayed();
    // console.log(navContainer.current)
    // if(y > 400){
    //   TweenMax.to(navContainer,2,{
    //    position: "fixed",
    //    height: 50
    //   })
    // }
    // if(y<300){
    //      TweenMax.to(navContainer,0.1,{
    //     position: "relative",
    //     height: 130
    //   })
    // }
    return () => {};
  }, []);

  return (
    <>
      <div
        className="latout--div"
        ref={(el) => {
          layout = el;
        }}
      ></div>
      {/* <div className="progress-div">
        <div className="progress" style={{ width: `${width}%` }}></div>
      </div> */}
      <div ref={navContainer}>
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
              <Link to="/search" className="navbar-user--icon rotate">
                &#9906;
              </Link>
            </li>
            <li>
              <Link to="/favaret" className="navbar-user--icon">
                &#9825;
              </Link>
            </li>
            <li>
              {userInfo && !userInfo.isAdmin && (
                <div
                  className="navbar-user--login"
                  onMouseEnter={showMeneu}
                  onMouseLeave={hideMeneu}
                >
                  <Link to="/">
                    {userInfo.name}
                    <span>&#10094;</span>
                  </Link>
                  <ul
                    ref={(el) => {
                      linksMenu = el;
                    }}
                  >
                    <li>
                      <Link to="/signin" onClick={() => logoutHandler()}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <div
                  className="navbar-user--login"
                  onMouseEnter={showMeneu}
                  onMouseLeave={hideMeneu}
                >
                  <Link to="/">
                    Admin<span>&#10094;</span>
                  </Link>
                  <ul
                    ref={(el) => {
                      linksMenu = el;
                    }}
                  >
                    <li>
                      <Link to="/admin/dashbord">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/signin" onClick={() => logoutHandler()}>
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              {!userInfo && <Link to="/signin">My Acount</Link>}
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </div>
        <div className="navbar--move">
          <NavbarFixed />
        </div>
      </div>
    </>
  );
};

export default NavBar;
