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
  const [w, setW] = useState(0);
  useEffect(() => {
    const trak = inputEl.current;
    const slides = Array.from(trak.children);
    const slideWidth = slides[0].getBoundingClientRect().width;


    setX(slides);
    setW(slideWidth);

    return () => {};
  }, []);
  console.log(x);
  console.log(w);
  let slideNum = x.length - 1;
  console.log(slideNum)


  const goLRight = () => {
    for (let index = 3; index >= 0; index--) {
      
      TweenMax.to(x[index], 7, {
        x: '-100vw',
        ease: Power3.easeOut
      });
      
    }
  //   if(slideNum > 0){
      
  //   TweenMax.to(x[slideNum], 7, {
  //     x: '-100vw',
  //     ease: Power3.easeOut
  //   });
  //   console.log(w);
  //   TweenMax.to(x[slideNum-1], 6, {
  //     x: 0,
  //     ease: Power3.easeOut,     
  //   });
    
  //   slideNum--;
  //   console.log(slideNum);
  // }
  // if(slideNum < x.length -1){
  //   TweenMax.to(x[slideNum+1], 0.1, {
  //     opacity: 0,
  //     ease: Power3.easeOut, 
  //     delay: 6   
  //   });
  //   TweenMax.to(x[slideNum+1], 0.1, {
  //     x: '50vw',      
  //     ease: Power3.easeOut, 
  //     delay: 8    
  //   });
  //   TweenMax.to(x[slideNum+1], 0.1, {
  //     opacity: 1,
  //     ease: Power3.easeOut, 
  //     delay: 8   
  //   });
  //   if(slideNum === 0){
  //  slideNum = 2;    }
  // }
  };
  
  const onHover = i => {
    TweenMax.to(desc[i], 1, {
      x: -w,
      ease: Power3.easeOut
    });
    TweenMax.to(desc[i-1], 2, {
      x: -w/2,
      ease: Power3.easeOut,
     
    });
  };
  console.log(desc)
  const goLift = () => {};
  return (
    <>
      <div className="carousel">
        <div className="carousel_track_container">
          <ul className="carousel_track" ref={inputEl}>
            {slideNews.map((slide, i) => (
              <li className={`carousel_slide item-${i}`} item key={i} ref={setRef}>
                <img className="carousel_img" src={slide.image} alt="img" />
              </li>
            ))}
          </ul>
        </div>
        <button className="carousel_button left" onClick={goLift}>
          {"<"}
        </button>
        <button className="carousel_button right" onClick={()=>goLRight(slideNum)}>
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
