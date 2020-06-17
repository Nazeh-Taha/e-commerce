import React,{ useRef, useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
import Background from "../images/slide1.webp";

import "../styles/MainSlider.scss";

const MainSlider = () => {
  const carouselEl = useRef(null);
  
  const settings = {
    duration: 1000,
  };

  useEffect(() => {
    console.log(
    document.querySelector(".test"));
    console.log(carouselEl.current);
    return () => {
      
    };
  }, [])
  return (
    <div className="test">
      <Slider {...settings} className="slide-container" ref={carouselEl}>

 
        <div className="slider__wrapper">
          <div
            className="slideshow__image"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
        </div>
        <div className="slider__wrapper">
          <div
            className="slideshow__image"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
        </div>
        <div className="slider__wrapper">
          <div
            className="slideshow__image"
            style={{ backgroundImage: `url(${Background})` }}
          ></div>
        </div>
      </Slider>
    </div>
  );
};

export default MainSlider;
