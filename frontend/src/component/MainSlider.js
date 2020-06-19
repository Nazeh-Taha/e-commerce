import React,{ useRef, useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
import {Link} from "react-router-dom";
import { TweenMax, Power3 } from "gsap";
import "../styles/MainSlider.scss";

const MainSlider = () => {
  const carouselEl = useRef(null);
  
  const sliderData = [
    { image: "./images/slide1.webp", header:"LIVING ROOM", description:"New Autumn Furniture Collection" , link:"EXPLORE" },
    { image: "./images/slide2.webp", header:"LIVING ROOM", description:"New Autumn Furniture Collection" , link:"EXPLORE" },
    { image: "./images/slide3.webp", header:"LIVING ROOM", description:"New Autumn Furniture Collection" , link:"EXPLORE" },
  ];
  const settings = {
    duration: 500,
  };
 
  useEffect(() => {
    // const slideItem = document.querySelector(".carousel-track");
    const slideItem = document.querySelector(".carousel-track");
console.log(slideItem);
   
    return () => {
      
    };
  }, [])
  return (
    
      <Slider {...settings} className="slide-container" ref={carouselEl}>
        {sliderData.map((item,i)=>(
          <div className="slider" key={i}>
        <div className="slider__wrapper">
          <div
            className="slider__image--wrap"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <div className="slider__text--wrap">
        <h1>{item.header}</h1>
        <p>{item.description}</p>
        <Link to="/">{item.link}</Link>
          </div>
        </div>
        </div>
        ))}

      </Slider>
  
  );
};

export default MainSlider;
