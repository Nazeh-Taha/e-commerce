import React, { useRef, useEffect, useState } from "react";
import "../styles/Carousel.scss";
import { TweenMax, Power3 } from "gsap";
const Carousel = () => {

  let desc = [];
  const setRef = ref => {
    desc.push(ref);
  };
  const slideNews = [
    { image: "./images/slide1.jpg" },
    { image: "./images/slide2.jpg" },
    { image: "./images/slide3.jpg" },
  ];
  const inputEl = useRef(null);
  const [x, setX] = useState([]);
  const [w, setW] = useState([]);
 
  useEffect(() => {
    const trak = inputEl.current;
    const slides = Array.from(trak.children);
    // const slideWidth = slides[0].getBoundingClientRect().width;


     setX(slides);
     setW(trak);

    return () => {};
  }, []);

  
  const goLRight = () => {


  };
  
 
  console.log(x)
  const goLift = () => {};
  return (
    <>
      <div className="carousel">
        <div className="carousel_track_container">
          <ul className="carousel_track" ref={inputEl}>
            {slideNews.map((slide, i) => (
              <li className={`carousel_slide item-${i}`}  key={i} ref={setRef}>
                <img className="carousel_img" src={slide.image} alt="img" />
              </li>
            ))}
          </ul>
        </div>
        <button className="carousel_button left" onClick={goLift}>
          {"<"}
        </button>
        <button className="carousel_button right" onClick={()=>goLRight()}>
          {">"}
        </button>
      </div>
      <div className="carousel_nav">
        <button className="carousel_indicator current_slide"></button>
        <button className="carousel_indicator"></button>
        <button className="carousel_indicator"></button>
      </div>
    </>
  );
};

export default Carousel;
